import { Helmet } from "react-helmet";
import Logo from "../components/Logo";
import { graphql } from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import { HomeQuery } from "../__generated__/HomeQuery.graphql";

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
  relayEnvironment: any;
}

const Home: React.FC<Props> = ({ relayEnvironment }) => (
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

      return (
        <div>
          <Helmet>
            <title>Home - React Demo</title>
          </Helmet>
          <div>NUM EPISODES: {props?.episodes?.results?.length}</div>
          <Logo />
        </div>
      );
    }}
    variables={{}}
  />
);

export default Home;
