import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  return <Link to={"/login"}>Home</Link>;
};

export default Home;
