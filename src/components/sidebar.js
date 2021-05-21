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
      
        <div className= {`side-bar   p-10 w-64  font-base  min-h-screen  bg-white  space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform  ${ show  ? ``:`-translate-x-full`} md:relative md:translate-x-0 transition duration-200 ease-in-out `}>
            <button className="md:hidden float-right  mb-5 " onClick={close}><CloseIcon/></button>
            {/*  Logo  */}
            <span className='mt-5 text-2xl flex justify-center'>PLANNER</span>
           
            <span className='mt-5 text-l flex justify-center'>Welcome : {user ? user.user.username: "ไม่มีผู้ใช้"}</span>

            <nav className="mt-10  mx-4 px-1  bg-gray-200  pt-7 pb-40 rounded-3xl" >
                <Link to="/">    <div  className="flex items-center py-2 px-4 hover:bg-black hover:text-white rounded-full"><StorageIcon className="mr-2"/> รายการของฉัน </div> </Link>
                <Link to="/reg"> <div  className="flex items-center py-2 px-4 hover:bg-black hover:text-white rounded-full"><EventIcon className="mr-2"/> ตารางเรียน</div> </Link>
                <Link to="/">    <div  className="flex items-center py-2 px-4 hover:bg-black hover:text-white rounded-full"><ForumIcon className="mr-2"/> ชุมชน </div> </Link>
            </nav>

            <div className="grid justify-items-center">
                <button className="border-4 border-black w-52 bg-white text-black p-2 rounded-xl focus:outline-none focus:bg-black focus:text-white" onClick={logout} >ลงชื่อออก</button>    
            </div>

              
        </div>
        
    )
}

export default Sidebar
