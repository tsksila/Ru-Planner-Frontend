import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';
import { selectUser} from '../redux/features/userSlice'




function Sidebar({show ,close}) {
    const user = useSelector(selectUser)

    console.log(user)
    return (     
      
        <div className= {`side-bar p-10  font-base  min-h-screen w-64 bg-white  space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  ${ show  ? ``:`-translate-x-full`} md:relative md:translate-x-0 transition duration-200 ease-in-out `}>
            <button className="md:hidden float-right  mb-5 " onClick={close}><CloseIcon/></button>

            <span className='mt-5 text-2xl flex justify-center'>PLANNER</span>

            <span className='mt-5 text-l flex justify-center'>Welcome : {user ? user.user : "ไม่มีใคร"}</span>

            <nav className="mt-10 mx-4 px-1  bg-gray-200  pt-7 pb-40 rounded-3xl" >
            <Link to="/"> <div href="" className="block py-2 px-4 hover:bg-black hover:text-white rounded-full">Menu1 </div> </Link>
            <Link to="/reg"> <div href="" className="block py-2 px-4 hover:bg-black hover:text-white rounded-full">Menu2</div> </Link>
            <Link to="/login"> <div href="" className="block py-2 px-4 hover:bg-black hover:text-white rounded-full">Login </div> </Link>
            <Link to="/register"> <div href="" className="block py-2 px-4 hover:bg-black hover:text-white rounded-full">Register </div> </Link>
            </nav>
            
        </div>

        
    )
}

export default Sidebar
