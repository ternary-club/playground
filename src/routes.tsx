import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/themes/default';

import Home from 'pages/Home';

const Routes: React.FC = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/project/:name" component={Home} />
    </BrowserRouter>
  </ThemeProvider>
);

export default Routes;
