import { Environment /*, Network*/, RecordSource, Store } from "relay-runtime";
import {
  RelayNetworkLayer,
  urlMiddleware,
} from "react-relay-network-modern/node8";
import RelayClientSSR from "react-relay-network-modern-ssr/node8/client";
import { SSRCache } from "react-relay-network-modern-ssr/node8/server";
/*
function fetchQuery(operation: any, variables: any) {
  return fetch(process.env.REACT_APP_GRAPHQL_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
*/

interface TWindow extends Window {
  __RELAY_BOOTSTRAP_DATA__?: SSRCache;
}

const relayClientSSR = new RelayClientSSR(
  (window as TWindow).__RELAY_BOOTSTRAP_DATA__
);

const network = new RelayNetworkLayer([
  urlMiddleware({
    url: process.env.REACT_APP_GRAPHQL_ENDPOINT as string,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  relayClientSSR.getMiddleware({
    //lookup: true, // Will preserve cache rather than purge after mount.
  }),
]);

const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default environment;
