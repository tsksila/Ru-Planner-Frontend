import React , {useState , useEffect} from 'react'
import {If,Else,Then} from 'react-if'

import {api_url} from '../../configs/api'

import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"
import Cancel from "@material-ui/icons/CancelRounded"
import {CircularProgress} from '@material-ui/core';
import axios from "axios"
import Swal from "sweetalert2"


const OPTIONS_LIMIT = 5
const defaultFilterOptions = createFilterOptions()
const SwalWithStyle = Swal.mixin({
  customClass: {
    title: "font-base",
    confirmButton:"p-3  bg-blue-300 font-base  rounded-xl focus:outline-none  text-blue-800 ",
    cancelButton: "p-3 ml-2 bg-red-300 font-base  rounded-xl focus:outline-none  text-red-800 ",
  },
  buttonsStyling: false,
})
const gradeData = [ {id:'1' , grade:"D"} , {id:'1.5' , grade:"D+"}, {id:'2' , grade:"C"},{id:'2.5' , grade:"C+"},
{id:'3' , grade:"B"},{id:'3.5', grade:"B+"},{id:'4' , grade:"A"}]

function MyList() {
   
    /** รายวิชาทั่งหมด */
    const [subjectList, setSubjectList] = useState([]) 
    /** รายวิชาของฉัน */
    const [mySubjectList, setMySubjectList] = useState([]) 
    /** แผนการเรียนของฉัน */
    const [myPlan ,setMyPlan] = useState({plan_terms:[]})

    /** ข้อมูลวิชา */
    const [subjID ,setSubjID] = useState()
    const [subjCode, setSubjCode] = useState("")
    const [subjName, setSubjName] = useState("")
    const [subjCredit, setSubjCredit] = useState(0)
    const [grade , setGrade] = useState("4")

    const [totalPlanCredit , setTotalPlanCredit] = useState()
    const [totalCredit , setTotalCredit] = useState(0)
    const [totalGrade , setTotalGrede] = useState(0)
    const [loading , setLoading] = useState(true)


      /** get all subject api */
    useEffect(  () => {
        let mounted = true
        axios.get(`${api_url}/subjects`).then((res) => {
        if (mounted) {
           setSubjectList(res.data)
           get_Mysubject()
        }
        })
        return () => {
        mounted = false
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        let mounted = true
        function calculate_credit () {
            const  credit =   mySubjectList.reduce((total , item)=> {
                const filtered =  subjectList.filter(subj =>  subj.id === item.subject)
                return total + filtered[0].subj_credit
            },0) 
            if(mounted) { setTotalCredit(credit) }
        }
        calculate_credit ()
        return () => {
            mounted = false
            }
    }, [mySubjectList]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        function  calculate_grade() {
            const  grade =   mySubjectList.reduce((total , item)=> {
                const filtered =  subjectList.filter(subj =>  subj.id === item.subject)
                return total +  (parseInt(item.grade)*filtered[0].subj_credit)
            },0) 
           setTotalGrede((grade/totalCredit).toFixed(2))
        }
        calculate_grade()
    }, [totalCredit]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        function calculate_planCredit() {
            const reducer = myPlan.plan_terms.reduce((total , term) => {
                 const  totalCredit =   term.subjects.reduce( (termCredit, item)=> {
                        const filtered = subjectList.filter((subj) => subj.id === item)
                        return termCredit + filtered[0].subj_credit
                    },0)
                 return total + totalCredit
            },0)
            setTotalPlanCredit(reducer)
        }
        calculate_planCredit()
    },[myPlan]) // eslint-disable-line react-hooks/exhaustive-deps

    
    function get_Mysubject (){
        const myid = localStorage.getItem('user_id')
        axios.get(`${api_url}/users/${myid}` , {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
                }).then( (res) => {
                    if(res.data.select_plans.length > 0){
                        get_myPlan( res.data.select_plans[0].id ) 
                        setMySubjectList(res.data.my_subjects)  
                        setLoading(false)
                    }else{
                        setLoading(false)
                    }
                })
    }
    function get_myPlan(id) {
            axios.get(`${api_url}/plans/${id}`).then(({data}) =>{
                setMyPlan(data)
            })
    }
    function set_subject(value) {
        

        setSubjID(value ? value.id :'') 
        setSubjCode(value ? value.subj_code : "")
        setSubjName(value.subj_fullname ? value.subj_fullname : "")
        setSubjCredit(value.subj_credit ? value.subj_credit : "")
    }
    function add_Mysubject() {
        setLoading(true)
        const filtered = mySubjectList.filter(item =>  item.subject === subjID) 
        if(filtered.length === 0)  {

            if(subjID) {
                const body ={ 
                    grade ,
                    user : localStorage.getItem('user_id') ,
                    subject : subjID
                }
                axios.post(`${api_url}/my-subjects` ,body ,{
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
                }).then((res) => {
                    get_Mysubject()
                    setLoading(false)
                })
            }else{
                SwalWithStyle.fire(({
                    icon: "error",
                    title: "กรุณาเลือกวิชา"
                }))
                setLoading(false)
            }
          
        }else {
            SwalWithStyle.fire(({
                icon: "error",
                title: "ท่านมีวิชานี้อยู่แล้วในรายการ"
            }))
            setLoading(false)
        }
    }
    function remove_Mysubject (ms_id){
        SwalWithStyle.fire({
            title: 'คุณต้องการลบรายการนี้ ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน!',
            cancelButtonText:'ยกเลิก'

          }).then((result) => {
            if (result.isConfirmed) {
                 axios.delete(`${api_url}/my-subjects/${ms_id}`,{
                    headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
                 }).then((res) => {
                    get_Mysubject()
                 })
                 
            }
          })
    }
    return (
        <div className ="grid  grid-cols-1  md:grid-cols-2 ">
            {/** My subject list */}
             <div className="mx-auto w-full  p-5 font-base flex flex-col justify-between   " style={{ height: "90vh" }}>
                <div className="w-full h-3/5 bg-white rounded-xl float-right shadow-lg text-sm flex flex-col justify-between">
                {/** Head */}
                    <div>
                        <div className="w-full h-10 rounded-t-xl bg-blue-300 flex  items-center pl-3">รายวิชาสะสม</div>
                        {/** Add my subject */}
                        <div className="flex flex-wrap flex-row bg-blue-100 p-3" >
                            <div className="flex flex-col w-3/12 pr-1">
                                <label>รหัสวิชา</label>
                                <Autocomplete
                                    getOptionSelected={(option, value) => option.subj_code === value.subj_code}
                                    id="sub-code"
                                    filterOptions={(options,  params) => {
                                        return  defaultFilterOptions(options,  params).slice(0, OPTIONS_LIMIT);
                                        }
                                    }
                                    options={subjectList}
                                    getOptionLabel={(option) =>   option.subj_code }
                                    onChange={(event, value) => set_subject(value) }
                                    renderOption={(option) => option.subj_code}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref}>
                                        <input
                                            style={{
                                            width: "100%",
                                            defaultValue:{subjCode},
                                            borderRadius: "0.375rem",
                                            paddingLeft: "0.5rem",
                                            }}
                                            type="text"

                                            {...params.inputProps}
                                        />
                                    </div>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col w-6/12 pr-1">
                            <label>ชื่อวิชา</label>
                                <input
                                    className="rounded-md  focus:outline-none w-full pl-2"
                                    value={subjName }
                                    onChange={(e)=> setSubjName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-2/12 pr-1">
                                <label>หน่วยกิต</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="rounded-md  focus:outline-none w-full pl-2  "
                                    value={subjCredit}
                                    onChange={(e)=> setSubjCredit(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col w-1/12">
                                <label>เกรด</label>
                                <select
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    className=" rounded-md h-5 focus:outline-none mr-2"
                                    >
                                    <option value="4">A</option>
                                    <option value="3.5">B+</option>
                                    <option value="3">B</option>
                                    <option value="2.5">C+</option>
                                    <option value="2">C</option>
                                    <option value="1.5">D+</option>
                                    <option value="1">D</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full mt-2 pr-2 items-end">   

                              <If condition={loading}> 
                                    <Then>
                                        <button
                                         className="px-4 w-20 bg-white   rounded-xl  shadow-lg focus:shadow-none focus:outline-none"
                                        >       
                                            <CircularProgress style={{'color': '#30BDFF'}} size={10} />
                                        </button>
                                    </Then>
                                    <Else>
                                    <button
                                        className="px-4  bg-white   rounded-xl  shadow-lg focus:shadow-none focus:outline-none"
                                        onClick={()=> add_Mysubject()}
                                    >
                                        เพิ่มวิชา
                                    </button>
                                    </Else>
                              </If> 
                            </div>
                        </div>
                    </div>
                    
                {/** Body */}
                    <div  className="h-full overflow-y-auto ">

                        {mySubjectList.length === 0 && !loading ? (<div className="w-full mt-10 flex justify-center text-xl text-gray-400">คุณไม่มีรายวิชาสะสม</div>) : ''}
                        {loading  ? (<div className=" Loader mx-auto mt-10"></div>):""} 
                        {mySubjectList.map((item ,i) => {
                            const subject  = subjectList.filter((subj)=> subj.id === item.subject)
                            const Mygrade  = gradeData.filter((data) => data.id === item.grade)
                            
                            return ( <div
                                    className="m-2 h-8 green-base rounded-md p-1  flex justify-between items-center "
                                    key={i}
                                >
                                    <div className="w-3/12 mr-1"> {subject[0].subj_code}  </div>
                                    <div className="w-6/12 mr-1 truncate"> {subject[0].subj_fullname}</div>
                                    <div className="w-1/12 mr-1">  {subject[0].subj_credit} </div>
                                    <div className="w-1/12 mr-1">  { Mygrade[0].grade} </div>
                                    <div
                                        className=" w-1/12 flex justify-end text-red-400 cursor-pointer mr-2 hover:text-red-600  "
                                        onClick={()=> remove_Mysubject(item.id)}
                                    >
                                    <Cancel />
                                    </div>
                                </div>) 
                        })}
                    </div>
                {/** footer */}
                    <div className="w-full h-10 rounded-b-xl bg-blue-300 flex items-center justify-between p-2"> 
                    <div className="p-1 rounded-md bg-white flex items-center">หน่วยกิตรวม : {` ${totalCredit}`} </div>  
                    <div className="p-1 rounded-md bg-white flex items-center"> เกรดเฉลี่ย :  {` ${totalGrade}`} </div> 
                    </div>
                </div>
                 {/** Head */}
               {/*  <div className="w-full h-1/3 bg-white rounded-xl float-right shadow-lg text-sm ">
                
                    <div className="w-full h-10 rounded-t-xl bg-blue-300 flex items-center pl-3">แผนการเรียนแนะนำ</div>
                </div> */}
             </div>
            {/** My Plan */}
             <div className="mx-auto w-full  p-5 font-base  "  style={{ height: "90vh" }}>
                <div className="w-full h-full bg-white rounded-xl float-right shadow-lg text-sm flex flex-col justify-between">
                {/** Head */}
                    <div className="w-full h-10 rounded-t-xl bg-blue-300 flex items-center pl-3 truncate">แผนการเรียนของฉัน  : {myPlan ? myPlan.plan_name : ""}</div>
                    {/** Body */}
                    <div className="h-full overflow-y-auto" > 
                        {loading ? (<div className=" Loader mx-auto mt-10"></div>):""} 
                        {myPlan.plan_terms.length === 0 && !loading ?(<div className="w-full mt-10 flex justify-center text-xl text-gray-400">คุณยังไม่ได้เลือกแผนการเรียน</div>):''}
                        
                       { myPlan.plan_terms.map((term ,i) => (

                        <div  className="bg-white  rounded-lg  border-2 border-blue-100 m-2" key={i} >
                                {/** term headder */}
                                <div className="bg-blue-200 h-8 rounded-t-lg pl-2  flex justify-between items-center">
                                <div>
                                    <span>ปี {term.term_year}</span> <span>เทอม { term.term_num === '3' ? 'ฤดูร้อน' : term.term_num}</span>
                                </div>
                                </div>
                                {/** Subject list */}

                                {term.subjects.map((item, i) => {
                                    const filtered = subjectList.filter(subj =>  subj.id === item)
                                    const subjPass = mySubjectList.filter((subjitem) =>  subjitem.subject  === item)

                                    return (
                                        <div className={`m-2 h-8   ${subjPass.length > 0 ? "green-base":"bg-gray-100 border border-gray-300"} rounded-md p-1    flex  items-center `} key={i}>
                                            <div className="w-3/12 mr-1"> {filtered[0].subj_code} </div>
                                            <div className="w-7/12 mr-1 truncate">{filtered[0].subj_fullname}</div>
                                            <div className=" w-1/12 mr-1"> {filtered[0].subj_credit} </div>
                                        </div>
                                        )
                                })}
                            </div>
                            )
                       )}
                    </div>
                    {/** footer */}
                    <div className="w-full h-10 rounded-b-xl bg-blue-300 flex items-center pl-3"> 
                        <div className="p-1 rounded-md bg-white flex items-center">หน่วยกิตรวม : {` ${totalCredit}/${totalPlanCredit}`} </div>  
                    </div>
                </div>
             </div>
        </div>
    )
}

export default MyList
