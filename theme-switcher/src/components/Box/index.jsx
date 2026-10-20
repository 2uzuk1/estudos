import "./styles.css";

import ThemeContext from "../../contexts/ThemeContext";
import { useContext } from "react";

const Box = () => {
  const theme = useContext(ThemeContext);

  return <div className={`box ${theme}`}></div>;
};

export default Box;
