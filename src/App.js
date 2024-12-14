// src/App.js
import { Layout } from 'antd';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes } from './routes';
import AdminLayout from './layouts/AdminLayout/AdminLayout';


const { Content } = Layout;

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let LayoutComponent = DefaultLayout;

            // Logging to verify route and component are set correctly
            console.log("Rendering route:", route.path, "with component:", Page);

            // Use custom layout if specified, otherwise use default layout
            if (route.layout==="AdminLayout") {
              LayoutComponent = AdminLayout;
            } else {
              LayoutComponent = DefaultLayout;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutComponent>
                    <Content>
                      <Page />
                    </Content>
                  </LayoutComponent>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
