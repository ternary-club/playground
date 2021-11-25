import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/themes/default';

import { Home } from 'pages/Home';
import { Project } from 'pages/Project';

import GlobalStyle from './globalStyle';

const Routes: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/project/:name" component={Project} />
      <Redirect to="/" />
    </BrowserRouter>
  </ThemeProvider>
);

export default Routes;
