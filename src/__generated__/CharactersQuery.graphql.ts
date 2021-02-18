/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CharactersQueryVariables = {};
export type CharactersQueryResponse = {
    readonly characters: {
        readonly results: ReadonlyArray<{
            readonly " $fragmentRefs": FragmentRefs<"Character_character">;
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
      ...Character_character
      id
    }
  }
}

fragment Character_character on Character {
  id
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CharactersQuery",
    "selections": [
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "Character_character"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CharactersQuery",
    "selections": [
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
    ]
  },
  "params": {
    "cacheID": "d149983eb54bfefd0551a996faeea3f8",
    "id": null,
    "metadata": {},
    "name": "CharactersQuery",
    "operationKind": "query",
    "text": "query CharactersQuery {\n  characters {\n    results {\n      ...Character_character\n      id\n    }\n  }\n}\n\nfragment Character_character on Character {\n  id\n  name\n}\n"
  }
};
(node as any).hash = '3dbd270638db7cb5b027fe20712db23a';
export default node;
