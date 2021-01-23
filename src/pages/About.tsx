import { Helmet } from "react-helmet";
import Logo from "../static/images/logo.svg";
import LogoPng from "../static/images/logo512.png";
import LogoPng1024 from "../static/images/logo1024.png";

const About: React.FC = () => (
  <div>
    <Helmet>
      <title>About - React Demo</title>
    </Helmet>
    <div>TEST SSR IMAGES HANDLE</div>
    <hr />
    <div>svg</div>
    <img alt="about" src={Logo} />
    <hr />
    <div>small PNG: if image are smaller than 10K then are base64 encoded</div>
    <img alt="about" src={LogoPng} />
    <hr />
    <div>
      big PNG: if image are bigger than 10K then file name is encoded as
      [file_name][hash].[ext]. hash is generated using 'md4' as hashType and
      'hex' as digestType. [md4:hash:hex:8]
    </div>
    <img alt="about" src={LogoPng1024} />
  </div>
);

export default About;
