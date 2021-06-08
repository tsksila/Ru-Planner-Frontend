import React ,{useEffect ,useState} from 'react'
import { useForm } from "react-hook-form"
import {If ,Then ,Else} from 'react-if'

import {api_url} from '../../configs/api'

import ArrowBack from '@material-ui/icons/ArrowBackRounded'
import ArrowForward  from '@material-ui/icons/ArrowForwardRounded'
import Add from '@material-ui/icons/AddCircleRounded'
import Fab from '@material-ui/core/Fab'
import {CircularProgress} from '@material-ui/core';

import Swal from "sweetalert2"
import axios from 'axios'
const SwalWithStyle = Swal.mixin({
    customClass: {
      title: "font-base",
      confirmButton:"p-3  bg-blue-300 font-base  rounded-xl focus:outline-none  text-blue-800 ",
      cancelButton: "p-3 ml-2 bg-red-300 font-base  rounded-xl focus:outline-none  text-red-800 ",
    },
    buttonsStyling: false,
  })


function Shedule() {
    const today = new Date()
    const [modal, setModal] = useState(false);
    const [load , setLoad] = useState(false)
    

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm(); 
    
    const onSubmitAddSheduel = async (e) => {

        if(e.etime <= e.stime ) {
            SwalWithStyle.fire({
                icon:"warning",
                title:"รูปแบบเวลาไม่ถูกต้อง" ,
                text:"กรุณาระบุเวลาเริ่ม-สิ้นสุดอีกครั้ง"
            })
            setLoad(false)
        }else{

            setLoad(true)
            const body = {
                topic:e.topic ,
                room :e.room ,
                day : e.day ,
                s_time :`${e.stime}:00` ,
                e_time :`${e.etime}:00` ,
                note : e.note ,
                user : localStorage.getItem('user_id')
            }
             axios.post(`${api_url}/my-schedules`,body , {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
             }).then(res => {
                 console.log(res.data)
                 setLoad(false)
                 SwalWithStyle.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'บันทึกรายการใหม่สำเร็จ',
                    showConfirmButton: false,
                    timer: 1000
                 })
             }).catch(()=>{
                setLoad(false)
             })
             
        }
    }


    

    function date () {
        let Day =  initDay.filter((day)=>  day.id  === today.getDay() )
        let Month = initMonth.filter((month) => month.id === today.getMonth())
        let Year = today.getFullYear()+543  // พศ

        return (`${Day[0].lable} ${today.getDate()} ${Month[0].lable} ${Year}`)
    }

    useEffect(() => {

       // document.getElementById(`T${today.getHours()}`).scrollIntoView({behavior: 'smooth'});
    },[])



    

    return (
        <div className=" h-full  relative   bg-blue-100 flex flex-col ">
                <div className=" md:h-full w-4/5 mx-auto my-5 rounded-2xl shadow-lg  relative" style={{backgroundColor :'#F0F8FF' ,height: "88vh"}}>
                        {/** Head */}
                     <div className="bg-indigo-400 w-full h-12 rounded-t-2xl text-white flex justify-between  ">
                          <select defaultValue='mon' className="text-sm my-2 ml-4 rounded-xl bg-white bg-opacity-25 w-21 pl-2 focus:outline-none focus:ring-2 focus:ring-white ">
                            {initDay.map((day ,i) => (<option key={i} className="bg-indigo-300 " value={day.value}>{day.lable}</option>))}
                          </select>
                          <div className="bg-white bg-opacity-25 rounded-xl m-2 text-sm flex items-center px-5"> {date()} </div>
                          <div className="flex items-center  bg-white rounded-lg bg-opacity-25 my-2 mr-4">
                            <button className="rounded-l-lg mr-2 focus:outline-none focus:ring-2 focus:ring-white" ><ArrowBack/></button>
                            <button className="rounded-r-lg focus:outline-none focus:ring-2 focus:ring-white" ><ArrowForward/></button>
                          </div>
                     </div>
                     {/** Body */}
                     <div className="bg-white shadow-md m-3  rounded-lg" >
                        <div className="overflow-y-auto  rounded-lg  w-full h-full " style={{height: "80vh"}} >
                            <table className="w-full rounded-lg "  >
                            <tbody >
                             {initTime.map ((time) => 
                                 ( 
                                 <tr className = " border-b-2 " id={`T${time.id}`} key={time.id}>
                                    <th className="w-1/5  border-r-2 h-20 text-gray-500  font-light">{time.lable} น.</th>
                                    <th className="w-4/5  h-20 pl-2  relative "> {time.note ? (<div className="w-11/12  h-28 absolute top-0  font-normal text-white bg-red-300 rounded-xl ">{time.note}</div>):""}</th>
                                 </tr>
                                 )
                             )}
                             </tbody>                    
                            </table>
                        </div> 
                     </div>
                     {/** footer */}
                     <div className="absolute bottom-3 right-3" onClick={()=> setModal(true)}> <Fab color="primary" className="focus:outline-none" > <Add style={{ fontSize: 50 }} className="text-white"/> </Fab></div>
                </div>

                {/** modal */}
                
                    <div className={`bg-gray-800 bg-opacity-50 font-normal  flex items-center  justify-center absolute top-0 left-0 right-0 bottom-0 ${modal ? ``:`hidden`}`} id="schedulemodal" onClick={(e)=> e.target.id === 'schedulemodal' ? setModal(false) : setModal(true) }>
                        <form className="bg-white w-4/5 md:w-3/5 block  rounded-xl p-10 absolute z-20 " onSubmit={handleSubmit(onSubmitAddSheduel)}>
                            <div className="text-xl mb-3 text-gray-500"> เพิ่มรายการ </div>
                            

                            <div className="flex flex-col">
                                <label> หัวข้อ </label>
                                <input type='text' className="bg-blue-100 rounded-md focus:outline-none focus:ring focus:border-blue-300 pl-3" {...register("topic", { required: true })} /> 
                                <span className="text-xs font-light text-red-400">{errors.topic?.type === "required" && "กรุณากรอกหัวข้อ"}</span>
                            </div>  

                            <div className=" flex flex-col mt-3 "> 
                                    <label> สถานที่ </label>
                                    <input type='text' className="bg-blue-100 rounded-md focus:outline-none focus:ring focus:border-blue-300 pl-3"  {...register("room", { required: true })} /> 
                                    <span className="text-xs font-light text-red-400">{errors.room?.type === "required" && "กรุณากรอกห้องเรียน"}</span>
                            </div>

                            <div className="  w-full flex  flex-col md:flex-row justify-between mt-3 relative">
                                 <div className="w-full md:w-2/5 flex flex-col"> 
                                    <label> ทุกวัน </label>
                                    <select className="bg-blue-100 rounded-md  h-6  pl-2 focus:outline-none "  {...register("day", { required: true })}>
                                        {initDay.map((day) => (<option value={day.id} key={day.id}>{day.lable}</option>))}
                                    </select>
                                    <span className="text-xs font-light text-red-400">{errors.day?.type === "required" && "กรุณาเลือกวัน"}</span>
                                </div>
                                <div className="w-full md:w-1/5 flex flex-col"> 
                                    <label> เวลาเริ่ม </label>

                                    <input type="time" defaultValue="06:00" min="06:00" max="24:00"  className="bg-blue-100 rounded-md focus:outline-none focus:ring focus:border-blue-300 pl-3 " id="stime" {...register("stime", { required: true })}/> 
                                    <span className="text-xs font-light text-red-400">{errors.stime?.type === "required" && "กรุณาเลือกเวลาเริ่ม"}</span>
                                </div>
                                <div className="w-full md:w-1/5 flex flex-col"> 
                                    <label> เวลาสิ้นสุด </label>
                                    <input type="time" defaultValue="06:00"  min="06:00" max="24:00"  className="bg-blue-100 rounded-md focus:outline-none focus:ring focus:border-blue-300 pl-3 " id="etime" {...register("etime", { required: true })}/> 
                                    <span className="text-xs font-light text-red-400"> {errors.etime?.type === "required" && "กรุณาเลือกเวลาสิ้นสุด"} </span> 
                                </div>
                            </div>

                            <div className="flex flex-col mt-2">
                                <label> จดบันทึก </label>
                                <textarea maxLength="100" type='text' className="bg-blue-100 rounded-md focus:outline-none focus:ring focus:border-blue-300 pl-3 " style={{ resize: 'none'}} {...register("note")} /> 
                            </div>
                            
                            <div className="mt-3 flex justify-end">
                                 <If condition={load}>
                                    <Then>
                                        <button  className="bg-green-600 text-white px-5 py-1 shadow-lg focus:shadow-none rounded-lg focus:outline-none focus:ring focus:ring-green-200"><CircularProgress  style={{'color': '#FFF'}} size={10}/></button>
                                    </Then>
                                    <Else>
                                        <button type="submit" className="bg-green-600 text-white px-5 py-1 shadow-lg focus:shadow-none rounded-lg focus:outline-none focus:ring focus:ring-green-200">เพิ่ม</button>
                                    </Else>

                                 </If>

                                
                            </div>

                        </form>
                     </div>   
        </div>
    )
}

const initDay = [
    {id:0 ,lable:"อาทิตย์" , value :"sun"},
    {id:1 ,lable:"จันทร์" , value :"mon"},
    {id:2 ,lable:"อังคาร" , value :"tue"},
    {id:3 ,lable:"พุธ" , value :"wed"},
    {id:4 ,lable:"พฤหัสบดี" ,value :"thu"},
    {id:5 ,lable:"ศุกร์" , value :"fri"},
    {id:6 ,lable:"เสาร์" , value :"sat"},
]

const initMonth = [
    {id:1 ,lable:"มกราคม"},
    {id:2 ,lable:"กุมภาพันธ์"},
    {id:3 ,lable:"มีนาคม"},
    {id:4 ,lable:"เมษายน"},
    {id:5 ,lable:"พฤษภาคม"},
    {id:6 ,lable:"มิถุนายน"},
    {id:7 ,lable:"กรกฏาคม"},
    {id:8 ,lable:"สิงหาคม"},
    {id:9 ,lable:"กันยายน"},
    {id:10 ,lable:"ตุลาคม"},
    {id:11 ,lable:"พฤศจิกายน"},
    {id:12 ,lable:"ธันวาคม"},
]

const initTime  = [
    {id:6 , lable :"6:00"},
    {id:7 , lable :"7:00"},
    {id:8 , lable :"8:00" ,note:"Note"},
    {id:9 , lable :"9:00"},
    {id:10 , lable :"10:00"},
    {id:11 , lable :"11:00"},
    {id:12 , lable :"12:00"},
    {id:13 , lable :"13:00"},
    {id:14 , lable :"14:00"},
    {id:15 , lable :"15:00"},
    {id:16 , lable :"16:00",note:"Note 2"},
    {id:17 , lable :"17:00"},
    {id:18 , lable :"18:00"},
    {id:19 , lable :"19:00"},
    {id:20 , lable :"20:00"},
    {id:21 , lable :"21:00"},
    {id:22 , lable :"22:00"},
    {id:23 , lable :"23:00"},
    {id:24 , lable :"24:00"},
]




export default Shedule
