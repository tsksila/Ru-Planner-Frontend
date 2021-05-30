import React  from 'react'
import {Link ,useHistory ,useRouteMatch} from 'react-router-dom'



/** icon */
import EventIcon from '@material-ui/icons/Event';
import StorageIcon from '@material-ui/icons/Storage';
import ForumIcon from '@material-ui/icons/Forum';
import CloseIcon from '@material-ui/icons/CloseRounded';

/* dialog */
import Swal from 'sweetalert2'


function Sidebar({show ,close}) {
    
    const history = useHistory()
    const {path } = useRouteMatch()


    /** customstyle sweet alert2 */
 
    const SwalWithStyle = Swal.mixin({
        customClass: {
          title : 'font-base',
          confirmButton: 'p-3  bg-blue-300 font-base mr-4  text-blue-800 ',
          cancelButton: 'p-3  bg-red-300 font-base  text-red-800  ',
        },
        buttonsStyling: false
      })
      
  

    const logout = ()  => {
        SwalWithStyle.fire({
            title: 'คุณต้องการออกจากระบบ ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน!',
            cancelButtonText:'ยกเลิก'

          }).then((result) => {
            if (result.isConfirmed) {
                history.push('/logout')
            }
          })
    }

     const user = localStorage.getItem('username')
     
    return (     
      
        <div className= {`side-bar  w-64  font-base  justify-center min-h-screen  bg-white   absolute inset-y-0 left-0 transform  ${ show  ? ``:`-translate-x-full`} md:relative md:translate-x-0 transition duration-200 ease-in-out `}>
            <button className="text-blue-500 md:hidden float-right  mb-5 focus:outline-none " onClick={close}><CloseIcon/></button>
            {/*  Logo  */}
             <img  alt="Planner" src={process.env.PUBLIC_URL + '/logo512.png'} className="h-44 mt-5 mx-auto"  /> 
           
            <span className='mt-5 text-l flex justify-center w-full bg-blue-200 p-3'>Welcome : {user ? user: "ไม่มีผู้ใช้"}</span>

            <nav className="mt-10  mx-4 px-1   pt-7 pb-40 " >
                <Link to="/">   <div className={`flex items-center py-2 px-4  ${path === '/profile' ? 'bg-blue-200 bg-opacity-25 text-blue-900':'text-gray-500'}   rounded-md`} ><StorageIcon className="mr-2"/> รายการของฉัน </div> </Link>
                <Link to="/shedule">   <div className={`flex items-center py-2 px-4  ${path === '/shedule' ? 'bg-blue-200 bg-opacity-25 text-blue-900':'text-gray-500'}   rounded-md`}><EventIcon className="mr-2"/> ตารางเรียน</div> </Link>
                <Link to="/community"> <div className={`flex items-center py-2 px-4  ${path === '/community' ? 'bg-blue-200 bg-opacity-25 text-blue-900':'text-gray-500'}   rounded-md`}><ForumIcon className="mr-2"/> ชุมชน </div> </Link>
            </nav>

            <div className="grid justify-items-center">
                <button className=" border-light-blue-500 border-opacity-25 w-52 bg-blue-300 text-black p-2 rounded-xl focus:outline-none focus:bg-blue-500 focus:text-white" onClick={logout} >ลงชื่อออก</button>    
            </div>

              
        </div>
        
    )
}

export default Sidebar
