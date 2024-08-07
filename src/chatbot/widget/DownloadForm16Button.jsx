import { generateForm16PDF } from "../utils/DownloadForm16";

const DownloadForm16Button = (props) => {
  const handleDownloadForm16 = () => {
    generateForm16PDF();
  };

  
}

export default DownloadForm16Button;
