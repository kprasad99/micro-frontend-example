import React from "react";
import { node as PNode } from 'prop-types';
import { Outlet } from 'react-router-dom';


import './home.scss';

interface HomeProps {
  children?: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return <div className="content">
      <div className="top-nav">APP-3</div>
      <div className="main-content">{children || <Outlet />}</div>
      <div className="bottom-nav">All Rights Reserved @ 2024</div>
  </div>;
};

Home.propTypes = {
  children: PNode,
};

export default Home;