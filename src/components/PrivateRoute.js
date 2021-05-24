import React , {useEffect} from 'react'
import {Redirect, Route } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logout} from '../redux/features/userSlice'


import * as JWT  from 'jsonwebtoken'

/* dialog */
import Swal from 'sweetalert2'

const getExpFromToken = (token ) => {
    const { exp }  = Object(JWT.decode(token)) 
    return exp 
}


const sessionExprired = ()=>{
    const SwalWithStyle = Swal.mixin({
        customClass: {
          title : 'font-base',
          content :'font-base',
          confirmButton: 'p-3  bg-blue-300 font-base text-blue-800',
        },
        buttonsStyling: false
      })

    SwalWithStyle.fire({
        icon: 'error',
        title: 'เซสชั่นหมดอายุ!',
      })
}



function PrivateRoute({component : Component , ...rest}) {

    
   
    const dispatch = useDispatch()
    const loggedIn = localStorage.getItem('loggedIn')
    const accessToken  = localStorage.getItem('accessToken')
    const currentTimeStamp = new Date().getTime().toString().substr(0 ,10)
    const accessTokenExp = getExpFromToken(accessToken)

    

    useEffect(() => {
        if (currentTimeStamp >= accessTokenExp) {
            sessionExprired()
            dispatch(logout())
            return
        }
        else if(!loggedIn) {
            sessionExprired()
            dispatch(logout())
            return
        }

    })

    

    return (
        <Route  {...rest} render={
            (props) => (
                loggedIn ? <Component {...props} /> :<Redirect to="/login" />
            )
        } />
    )
}

export default PrivateRoute
