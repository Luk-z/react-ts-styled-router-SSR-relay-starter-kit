import "isomorphic-fetch";
import "regenerator-runtime/runtime";
import "dotenv/config";
import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { RelayNetworkLayer, urlMiddleware } from "react-relay-network-modern";
import RelayServerSSR from "react-relay-network-modern-ssr/lib/server";
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import App from "../App";

const PORT = process.env.PORT;

const app = express();

//first check if the url match build folder entries (except index.html)
app.use(
  express.static(path.resolve(__dirname, "../..", "build"), {
    index: false,
  })
);

app.get("/", async (req, res, next) => {
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

  // Once the RelayEnvironment is instantiated, two App renders need to be made in
  // order to prepare data for hydration:

  // First, kick off Relay requests with an initial render
  renderToString(<App relayEnvironment={relayEnvironment} />);

  // Second, await while all data were recieved from graphql server
  const relayData = await relayServerSSR.getCache();
  console.log("episodes number", relayData[0][1].data.episodes.results.length);

  // Third, render the app a second time now that the Relay store has been primed
  // and send HTML and bootstrap data to the client for rehydration.
  const appHtml = renderToString(
    <App
      relayEnvironment={
        new Environment({
          network: Network.create(() => {
            console.log("I'm never printed...");
            return relayData[0][1];
          }),
          store,
        })
      }
    />
  );

  try {
    res.status(200).send(`
      <html>
        <body>
          <div id="react-root">${appHtml}</div>
        </body>
      </html>
    `);
  } catch (error) {
    console.log("(server.js) Error: ", error);
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
