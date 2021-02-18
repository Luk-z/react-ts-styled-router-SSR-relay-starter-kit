import { GraphQLTaggedNode } from "react-relay";
import { RouteConfig } from "react-router-config";

export interface TRelayComponent<T> extends React.FC<T> {
  mainQuery?: GraphQLTaggedNode;
}

export interface TRoutes extends RouteConfig {
  component: TRelayComponent<any>;
}
