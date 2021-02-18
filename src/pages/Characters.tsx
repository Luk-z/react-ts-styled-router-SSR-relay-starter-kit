import { Helmet } from "react-helmet";
import Logo from "../components/Logo";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLTaggedNode, QueryRenderer } from "react-relay";
import { CharactersQuery } from "../__generated__/CharactersQuery.graphql";

export const Query = graphql`
  query CharactersQuery {
    characters {
      results {
        id
        name
      }
    }
  }
`;

interface TRelayComponent<T> extends React.FC<T> {
  mainQuery: GraphQLTaggedNode;
}

interface Props {
  relayEnvironment: any;
}

const Characters: TRelayComponent<Props> = ({ relayEnvironment }) => (
  <QueryRenderer<CharactersQuery>
    environment={relayEnvironment}
    query={Query}
    render={({ error, props, retry }) => {
      if (error) {
        return <div>Error!</div>;
      }

      if (!props) {
        return <div>Loading...</div>;
      }

      const characters = props?.characters?.results;

      return (
        <div>
          <Helmet>
            <title>Characters</title>
          </Helmet>
          {(!characters || !characters.length) && (
            <div>No character found!</div>
          )}
          {characters && characters.length && (
            <div>
              <div>NUM characters: {props?.characters?.results?.length}</div>
              <hr />
              {characters.map((item, index) => (
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

Characters.mainQuery = Query;

export default Characters;
