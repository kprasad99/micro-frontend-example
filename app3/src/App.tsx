import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

import "./index.scss";


export default function App() {
  const content = useRoutes(routes);
  return content;
};
