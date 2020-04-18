import React from 'react';
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Register from './components/Register';
import useUser from './hooks/use-user';
import Manager from './components/Manager';
import Login from './components/Login';


const withAuth = (Component) => {
  return () => {
    const {isLogin} = useUser();
    return isLogin ? <Component /> : <Redirect to="/login" />
  }
}

function App() {
  const { isLogin, user, resetUser} = useUser()
  const NotFound = () => {
    return <h1>404 Page not found.</h1>
  }
  return (
    <Router>
      <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Expense Manager</Navbar.Heading>
            <Navbar.Divider />
          </Navbar.Group>
          {
            isLogin && (
              <Navbar.Group align={Alignment.RIGHT}>
                <Navbar.Heading><strong>Hello {user.name}</strong></Navbar.Heading> 
                <Button onClick={() => { resetUser()}} className="bp3-minimal" icon="log-out" text="Logout" />
              </Navbar.Group>
            )
          }
      </Navbar>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />        
        <Route exact path="/manager" component={withAuth(Manager)} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
