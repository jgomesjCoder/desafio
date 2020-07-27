import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import PrivateRoute from './privateRoute';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import Client from '../Pages/Client';
import ClientList from '../Pages/ClientList';
import Menu from '../components/navbar';



const Routes = (props) => (
    <BrowserRouter >
    <Menu />
        <Switch>
            <Route exact path='/Login' component={LoginPage} />
            <Route exact path='/Register' component={RegisterPage} />
            <PrivateRoute exact path='/client' component={Client} />
            <PrivateRoute exact path='/clients' component={ClientList} />
            <PrivateRoute exact path='/' component={() => <h1> Home</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;