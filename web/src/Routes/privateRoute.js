import React from 'react';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = (props) => {
    const isAuthenticated = !!localStorage.getItem('app-token');
    return isAuthenticated ?
    <Route {...props} /> : <Redirect to="/login"/>
}

export default PrivateRoute;