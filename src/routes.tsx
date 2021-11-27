import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/themes/default';

import { Home } from 'pages/Home';
import { Project } from 'pages/Project';

import GlobalStyle from 'styles/globalStyle';

const Routes: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/project/:name" component={Project} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

export default Routes;
