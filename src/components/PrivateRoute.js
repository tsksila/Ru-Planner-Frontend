import React from 'react'
import {Redirect, Route } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {userLoggedIn} from '../redux/features/userSlice'

function PrivateRoute({component : Component , ...rest}) {
    const loggedIn = useSelector(userLoggedIn)

    return (
        <Route  {...rest} render={
            (props) => (
                loggedIn ? <Component {...props} /> :<Redirect to="/login" />
            )
        } />
    )
}

export default PrivateRoute
