import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Home:React.FC = (props: Props) => {
  return <Link to={"/login"}>{process.env.APP || 888}</Link>;
};

export default Home;
