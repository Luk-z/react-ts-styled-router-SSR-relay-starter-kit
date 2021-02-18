import { Helmet } from "react-helmet";
import Logo from "../components/Logo";
import { graphql } from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import { CharactersQuery } from "../__generated__/CharactersQuery.graphql";
import { TRelayComponent } from "../types";
import Character from "../components/Character";

export const Query = graphql`
  query CharactersQuery {
    characters {
      results {
        ...Character_character
      }
    }
  }
`;

interface Props {
  relayEnvironment?: any;
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
              {characters.map(
                (item, index) =>
                  item && <Character key={index} character={item} />
              )}
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
