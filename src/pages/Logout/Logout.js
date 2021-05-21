import React ,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {logout} from '../../redux/features/userSlice'
import {useDispatch} from 'react-redux'

function Logout() {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect (()=> {
        dispatch(logout())
        return history.push('/login')
    })

    return (<> Logout </>)
}

export default Logout
