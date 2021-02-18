import React from "react";
import { Helmet } from "react-helmet";
import { Link, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

interface Props {
  relayEnvironment: any;
}

const App: React.FC<Props> = ({ relayEnvironment }) => {
  const defaultLocale = "";
  const url = "";
  const metaOgImageUrl = "";
  return (
    <>
      <div>
        <Helmet
          defer={false}
          htmlAttributes={{
            lang: defaultLocale,
          }}
          link={[{ rel: "canonical", href: url }]}
          meta={[
            { property: "og:url", content: url },
            {
              property: "og:image",
              content: metaOgImageUrl,
            },
            { property: "og:site_name", content: "Demo App" },
            /*{property: 'fb:app_id', content: facebookAppId},
            {name: 'apple-itunes-app', content: appStoreIdContent},
            {name: 'google-play-app', content: androidStoreIdContent},*/
          ]}
        />
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/notfound">404</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/characters">
            <Characters relayEnvironment={relayEnvironment} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <Home relayEnvironment={relayEnvironment} />
          </Route>
          <Route
            render={({ staticContext }) => {
              if (staticContext) {
                staticContext.statusCode = 404;
              }
              return <NotFound />;
            }}
            path="*"
          />
        </Switch>
      </div>
    </>
  );
};

export default App;
