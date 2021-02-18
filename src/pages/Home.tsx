import { Helmet } from "react-helmet";
import Logo from "../components/Logo";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLTaggedNode, QueryRenderer } from "react-relay";
import { HomeQuery } from "../__generated__/HomeQuery.graphql";
import { TRelayComponent } from "../types";

export const Query = graphql`
  query HomeQuery {
    episodes {
      results {
        id
        name
        episode
      }
    }
  }
`;

interface Props {
  relayEnvironment?: any;
}

const Home: TRelayComponent<Props> = ({ relayEnvironment }) => (
  <QueryRenderer<HomeQuery>
    environment={relayEnvironment}
    query={Query}
    render={({ error, props, retry }) => {
      if (error) {
        return <div>Error!</div>;
      }

      if (!props) {
        return <div>Loading...</div>;
      }

      const episodes = props?.episodes?.results;

      return (
        <div>
          <Helmet>
            <title>Home - React Demo</title>
          </Helmet>
          {(!episodes || !episodes.length) && <div>No episodes found!</div>}
          {episodes && episodes.length && (
            <div>
              <div>NUM episodes: {props?.episodes?.results?.length}</div>
              <hr />
              {episodes.map((item, index) => (
                <div key={index}>{item?.name}</div>
              ))}
            </div>
          )}
          <Logo />
        </div>
      );
    }}
    variables={{}}
  />
);

Home.mainQuery = Query;

export default Home;
