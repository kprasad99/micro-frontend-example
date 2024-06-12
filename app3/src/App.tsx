import React from 'react';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import routes from './routes';

import "./index.scss";
import Home from './modules/home/home';
import App3 from './modules/app3/app3';

export default function App() {
  // const content = useRoutes(routes);
  // return content;
  return (
    <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<App3 />} />
        </Route>
    </Routes>
  );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<React.StrictMode>
  <BrowserRouter>
      <App />
  </BrowserRouter>
</React.StrictMode>);
