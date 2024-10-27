// src/App.js
import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { publicRoutes } from './routes';



const { Content } = Layout;

function App() {
    return (
        <Router>
          <div className="App">
            <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
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
