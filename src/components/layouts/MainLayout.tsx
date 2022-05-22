import React from "react";
type Props = {
  children:React.ReactNode
};
const MainLayout: React.FC<Props> = ({
  children
}) => (
  <div>
    <h1>sdfsdf</h1>
    {children}
  </div>
);
export default MainLayout;
