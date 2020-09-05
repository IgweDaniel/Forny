import React from "react";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout } from "./components";
import { Landing, MyForms, Login, Register } from "./pages";
function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Layout>
              <Route path="/forms">
                <MyForms />
              </Route>
            </Layout>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
