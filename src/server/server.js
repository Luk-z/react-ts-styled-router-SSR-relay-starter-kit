import "isomorphic-fetch";
import "regenerator-runtime/runtime";
import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import serialize from "serialize-javascript";
import React from "react";
import { renderToString } from "react-dom/server";
import { RelayNetworkLayer, urlMiddleware } from "react-relay-network-modern";
import RelayServerSSR from "react-relay-network-modern-ssr/lib/server";
import { StaticRouter } from "react-router-dom";
import {
  Environment,
  fetchQuery,
  Network,
  RecordSource,
  Store,
} from "relay-runtime";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import App from "../App";
import GlobalStyle from "../globalStyle";
import { Query } from "../pages/Home";

const PORT = process.env.PORT;

const app = express();

//first check if the url match build folder entries (except index.html)
app.use(
  express.static(path.resolve(__dirname, "../..", "build"), {
    index: false,
  })
);

app.get("/*", (req, res, next) => {
  console.log(req.path);
  const { path: location } = req;
  const context = {};
  fs.readFile(
    path.resolve("./build/index.html"),
    "utf-8",
    async (err, data) => {
      if (err) {
        console.log(`ERROR: `, err);
        return res.status(500).send("Some error happens");
      }

      const relayServerSSR = new RelayServerSSR();
      const network = new RelayNetworkLayer([
        urlMiddleware({
          url: process.env.REACT_APP_GRAPHQL_ENDPOINT,
          headers: {
            "Content-Type": "application/json",
          },
        }),
        relayServerSSR.getMiddleware(),
      ]);
      const source = new RecordSource();
      const store = new Store(source);
      const relayEnvironment = new Environment({ network, store });

      await fetchQuery(relayEnvironment, Query);
      const relayData = await relayServerSSR.getCache();

      const newEnv = new Environment({
        network: Network.create(function () {
          console.log("relayData");
          return relayData[0][1];
        }),
        store: new Store(new RecordSource()),
      });

      const sheet = new ServerStyleSheet();
      let html = "";
      let styleTags = "";
      try {
        html = renderToString(
          <StyleSheetManager sheet={sheet.instance}>
            <>
              <GlobalStyle />
              <StaticRouter location={location} context={context}>
                <App relayEnvironment={newEnv} />
              </StaticRouter>
            </>
          </StyleSheetManager>
        );
        styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
      } catch (error) {
        // handle error
        console.error(error);
      } finally {
        sheet.seal();
      }

      return res.status(context.statusCode === 404 ? 404 : 200).send(
        data
          .replace(
            '<div id="root"></div>',
            `
                <div id="root">${html}</div>
                <script>
                  window.__RELAY_BOOTSTRAP_DATA__ = ${serialize(relayData)};
                </script>
              `
          )
          .replace("</head><body>", `${styleTags}</head><body>`)
      );
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
