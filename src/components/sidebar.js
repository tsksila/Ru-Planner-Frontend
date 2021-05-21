import React  from 'react'
import {Link ,useHistory} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';


/** icon */
import EventIcon from '@material-ui/icons/Event';
import StorageIcon from '@material-ui/icons/Storage';
import ForumIcon from '@material-ui/icons/Forum';

/* dialog */
import Swal from 'sweetalert2'


function Sidebar({show ,close}) {
    
    const history = useHistory()

    const logout = ()  => {
        Swal.fire({
            title: 'คุณต้องการออกจากระบบ ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ยืนยัน!',
            cancelButtonText:'ยกเลิก'

          }).then((result) => {
            if (result.isConfirmed) {
                history.push('/logout')
            }
          })
    }

     const user = JSON.parse(localStorage.getItem('user_data'))
     
    return (     
      
        <div className= {`side-bar   p-10 w-64  font-base  justify-center min-h-screen  bg-white  space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  ${ show  ? ``:`-translate-x-full`} md:relative md:translate-x-0 transition duration-200 ease-in-out `}>
            <button className="md:hidden float-right  mb-5 " onClick={close}><CloseIcon/></button>
            {/*  Logo  */}
             <img  alt="Planner" src={process.env.PUBLIC_URL + '/logo512.png'}  /> 
           
            <span className='mt-5 text-l flex justify-center w-full bg-blue-200 p-3'>Welcome : {user ? user.user.username: "ไม่มีผู้ใช้"}</span>

            <nav className="mt-10  mx-4 px-1   pt-7 pb-40 " >
                <Link to="/">    <div  className="flex items-center py-2 px-4 text-gray-500 hover:bg-blue-200 bg-opacity-25 hover:text-blue-900 rounded-md"><StorageIcon className="mr-2"/> รายการของฉัน </div> </Link>
                <Link to="/reg"> <div  className="flex items-center py-2 px-4 text-gray-500 hover:bg-blue-200 bg-opacity-25 hover:text-blue-900 rounded-md"><EventIcon className="mr-2"/> ตารางเรียน</div> </Link>
                <Link to="/">    <div  className="flex items-center py-2 px-4 text-gray-500 hover:bg-blue-200 bg-opacity-25 hover:text-blue-900 rounded-md"><ForumIcon className="mr-2"/> ชุมชน </div> </Link>
            </nav>

            <div className="grid justify-items-center">
                <button className=" border-light-blue-500 border-opacity-25 w-52 bg-blue-300 text-black p-2 rounded-xl focus:outline-none focus:bg-blue-500 focus:text-white" onClick={logout} >ลงชื่อออก</button>    
            </div>

              
        </div>
        
    )
}

export default Sidebar
