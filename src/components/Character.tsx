import { createFragmentContainer } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { Character_character } from "../__generated__/Character_character.graphql";

interface Props {
  character: Character_character;
}

const Character: React.FC<Props> = ({ character }) => {
  return <div>CHARACTER: {character.name}</div>;
};

export default createFragmentContainer(Character, {
  character: graphql`
    fragment Character_character on Character {
      id
      name
    }
  `,
});
