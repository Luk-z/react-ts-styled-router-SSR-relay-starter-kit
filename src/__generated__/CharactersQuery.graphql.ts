/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CharactersQueryVariables = {};
export type CharactersQueryResponse = {
    readonly characters: {
        readonly results: ReadonlyArray<{
            readonly id: string | null;
            readonly name: string | null;
        } | null> | null;
    } | null;
};
export type CharactersQuery = {
    readonly response: CharactersQueryResponse;
    readonly variables: CharactersQueryVariables;
};



/*
query CharactersQuery {
  characters {
    results {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Characters",
    "kind": "LinkedField",
    "name": "characters",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "results",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CharactersQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CharactersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0e3954ff0b099422a5f782b48675e172",
    "id": null,
    "metadata": {},
    "name": "CharactersQuery",
    "operationKind": "query",
    "text": "query CharactersQuery {\n  characters {\n    results {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b618e2725906918b40d1d3e653bb59a9';
export default node;
