

import React , {useState ,useEffect} from 'react';

import Sidebar from "./Sidebar";
import MenuIcon from '@material-ui/icons/Menu';

function Layout({children}) {
    const [show ,setShow] =  useState(false);
    function close (e) {  setShow(false)  }

    useEffect(() => {
        const resizeListener = () => {
          // change width from the state object
          setShow(false)
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);
        // clean up function
        return () => {
          // remove resize listener
          window.removeEventListener('resize', resizeListener);
        }
      }, [])
    

    return (

        <div className="flex min-h-screen ">
                <div  className='relative h-screen  md:flex '>
                    <Sidebar show={show} close={close} />
                </div>
                <div className=" flex-1 h-screen justify-center ">
                  <div className='md:flex'>
                      <div className="bg-blue-300 text-gray-100 flex justify-between  md:relative md:hidden">
                            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700" onClick={()=> setShow(!show)} >
                                    <MenuIcon />
                            </button>
                            <span className=' m-3 text-2xl flex justify-center'>  <img alt="Planner" src={process.env.PUBLIC_URL + '/logo512.png' } className="h-10 rounded-full" /> </span>
                      </div>
                  </div>
                    {children}
                </div>
        </div>
    );
}

export default Layout;