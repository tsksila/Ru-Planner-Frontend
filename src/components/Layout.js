

import React , {useState ,useEffect} from 'react';

import Sidebar from "./Sidebar";
import MenuIcon from '@material-ui/icons/Menu';

function Layout({children}) {
    const [show ,setShow] =  useState(false);
    function close () {setShow(false)}

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

        <div className="flex ">
                <div  className='relative min-h-screen  md:flex '>
                    <Sidebar show={show} close={close}/>
                </div>
               
                <div className=" flex-1 justify-center ">

                  <div className='md:flex'>
                      <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
                      
                            <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700" onClick={()=> setShow(!show)} >
                                    <MenuIcon/>
                            </button>

                            <span className=' m-3 text-2xl flex justify-center'>PLANNER</span>

                      </div>
                  </div>

                    {children}
                </div>
            
        </div>
    );
}

export default Layout;