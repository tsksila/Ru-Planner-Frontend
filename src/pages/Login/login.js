import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Link ,useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login} from '../../redux/features/userSlice'


import {CircularProgress} from '@material-ui/core';

import axios from 'axios'


function Login() {
  const [loading , setLoading] = useState(false)
  const [checkUser , setCheckUser] = useState(true)
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();  



  const onSubmitLogin = async (e) => {
    setLoading(true)

    const {data} = await axios.post('https://ruplanner.herokuapp.com/auth/local',{
        identifier: e.email,
        password: e.password
    })
    .catch(()=> {
        setLoading(false)
        setCheckUser(false)
    })


    dispatch(login({
      accessToken : data.jwt ,
      user_id : data.user.id ,
      username : data.user.username,
      loggedIn :true
    }))

    setLoading(false)
    history.push('/')

  } 


  function handelRemember (e) {
      const email =  document.getElementById('email').value
      if(e.target.checked) {
        localStorage.setItem('remember_email' , email)
        localStorage.setItem('remember_me' , true)
      }else {
        localStorage.removeItem('remember_email')
        localStorage.removeItem('remember_me' )
      }
  }

  return (
      <div className="min-h-screen   bg-blue-100 flex flex-col justify-center ">
        <div className="max-w-md w-full mx-auto">

          {/** Delete on production  */}
          <div className="text-center  font-base font-medium text-sm">
            email : user@mail.com <br></br>
            pass : cakesom212
          </div>
          
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 rounded-3xl shadow-lg">  
            

          <form className="space-y-6" onSubmit={handleSubmit(onSubmitLogin)}>   
            <div>
              <label className="text-l  font-base  text-gray-600 block"> อีเมล </label>
              <input
                type="text"
                id="email"
                defaultValue={localStorage.getItem('remember_email')}
                {...register("email", { required: true })}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
                style={{borderColor : errors.email ? "red" : ""}}
              />

              <div className="text-sm text-red-300 font-base">
                {errors.email?.type === "required" && "กรุณากรอกชื่อผู้ใช้"}
                {!checkUser ? 'ชื่อหรือรหัสผ่านไม่ถูกต้อง' :''}
              </div>

            </div>

            <div>
              <label className="text-l  font-base  text-gray-600 block"> พาสเวิร์ด </label>
              <input
                type="password"
                defaultValue="cakesom212"
                {...register("password", { required: true })}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                style={{ borderColor : errors.password ? "red" : ""}}
              />
              <div className="text-sm text-red-300 font-base">
                {errors.password?.type === "required" && "กรุณากรอกรหัสผ่าน"}
              </div>
            </div>


            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4   checked:bg-blue-600 checked:border-transparent"
                  onChange={(e)=> handelRemember(e)}
                  defaultChecked={localStorage.getItem('remember_me')? 'checked':''}
                  

                />
                <label htmlFor="" className="ml-2 text-sm  text-gray-600 font-base" >  จำชื่อผู้ใช้ </label>
              </div>
              <div>
                <Link to="/"> <div href="" className="font-base font-medium text-sm text-gray-500" >  ลืมรหัสผ่าน? </div> </Link>
              </div>
            </div>

            
            <div>
              <button
                type="submit"
                className="w-full   items-center  py-2 px-4 font-base text-white bg-green-500 hover:bg-green-800  focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50  rounded-lg "
              >
                  {loading ? ( <CircularProgress style={{'color': '#fafafa'}} size={20} /> ) : "เข้าสู่ระบบ"}
              </button>
            </div>


          </form>

          <div className="flex items-end mt-5">
             <Link to="/register">  <div className="font-base font-medium text-sm text-gray-800"> สมัครสมาชิก... </div> </Link>
          </div>

        </div>
      </div>
  );
}

export default Login;
