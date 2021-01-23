import styled from "styled-components";
import logo from "../static/images/logo.svg";

const AppContainer = styled.div`
  text-align: center;
`;
const AppLogoContainer = styled.img`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    & {
      animation: App-logo-spin infinite 20s linear;
    }
  }
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
const AppHeaderContainer = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;
const AppLinkContainer = styled.a`
  color: #61dafb;
`;

const Logo: React.FC = () => (
  <AppContainer>
    <AppHeaderContainer>
      <AppLogoContainer src={logo} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <AppLinkContainer
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </AppLinkContainer>
    </AppHeaderContainer>
  </AppContainer>
);

export default Logo;
