import './App.css';
import MainLayout from './components/layouts/MainLayout';
import LoginPage from './components/pages/LoginPage';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import React from 'react';
import { UserContextProvider } from './UserContext';

function App() {
  const renderApp = () => {
    return (
      <UserContextProvider>
        <Route path="/" exact>
          <Redirect to="/marathons" />
        </Route>
        <MainLayout />
      </UserContextProvider>
    );
  };
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage>
            <LoginForm />
          </LoginPage>
        </Route>
        <Route path="/registration">
          <LoginPage>
            <RegistrationForm />
          </LoginPage>
        </Route>
        {localStorage.getItem('token') ? renderApp() : <Redirect to="/login" />}
      </Switch>
    </Router>
  );
}

export default App;
