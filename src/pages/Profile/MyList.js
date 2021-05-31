import React , {useState , useEffect} from 'react'

import Cancel from "@material-ui/icons/CancelRounded"
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete"
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

    /** ข้อมูลวิชา */
    const [subjID ,setSubjID] = useState()
    const [subjCode, setSubjCode] = useState()
    const [subjName, setSubjName] = useState()
    const [subjCredit, setSubjCredit] = useState()
    const [grade , setGrade] = useState("4")


    const [totalCredit , setTotalCredit] = useState()





      /** get all subject api */
    useEffect(() => {
        let mounted = true
        axios.get("https://ruplanner.herokuapp.com/subjects").then((res) => {
        if (mounted) {
            setSubjectList(res.data)
            get_Mysubject()
        }
        })
        return () => {
        mounted = false
        }
    },[])

    function get_Mysubject (){
        const myid = localStorage.getItem('user_id')
         axios.get(`https://ruplanner.herokuapp.com/users/${myid}` , {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
         }).then((res) => {
            setMySubjectList(res.data.my_subjects)
         })
    }



    function set_subject(value) {
        setSubjID(value ? value.id :'') 
        setSubjCode(value ? value.subj_code : "")
        setSubjName(value ? value.subj_fullname : "")
        setSubjCredit(value ? value.subj_credit : "")
    }

    function add_Mysubject() {
        const body ={ 
            grade ,
            user : localStorage.getItem('user_id') ,
            subject : subjID
        }

        axios.post('https://ruplanner.herokuapp.com/my-subjects' ,body ,{
            headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
        }).then((res) => {
            console.log(res.data)
            get_Mysubject()
        })


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
                 axios.delete(`https://ruplanner.herokuapp.com/my-subjects/${ms_id}`,{
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
                                    defaultValue={subjName || ""}
                                />
                            </div>
                            <div className="flex flex-col w-2/12 pr-1">
                                <label>หน่วยกิต</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="rounded-md  focus:outline-none w-full pl-2  "
                                    defaultValue={subjCredit || ""}
                                />
                            </div>
                            <div className="flex flex-col w-1/12">
                                <label>เกรด</label>
                                <select
                                    defaultValue={grade}
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
                                <button
                                    className="px-4  bg-white   rounded-xl  shadow-lg focus:shadow-none focus:outline-none"
                                    onClick={()=> add_Mysubject()}
                                >
                                    เพิ่มวิชา
                                </button>
                            </div>
                        </div>
                    </div>
                    
                {/** Body */}
                    <div  className="h-full overflow-y-auto ">

                        {!mySubjectList.length > 0 ? (<div className=" Loader mx-auto mt-10"></div>):''}
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
                    <div className="w-full h-10 rounded-b-xl bg-blue-300 flex items-center justify-between pl-3  pr-3"> 
                        <div> หน่วยกิตรวม : </div> 
                        <div> เกรดเฉลี่ย : </div> 
                    </div>
                </div>
                <div className="w-full h-1/3 bg-white rounded-xl float-right shadow-lg text-sm ">
                 {/** Head */}
                    <div className="w-full h-10 rounded-t-xl bg-blue-300 flex items-center pl-3">แผนการเรียนแนะนำ</div>
                </div>
             </div>
            {/** My Plan */}
             <div className="mx-auto w-full  p-5 font-base  "  style={{ height: "90vh" }}>
                <div className="w-full h-full bg-white rounded-xl float-right shadow-lg text-sm flex flex-col justify-between">
                {/** Head */}
                    <div className="w-full h-10 rounded-t-xl bg-blue-300 flex items-center pl-3">แผนการเรียนของฉัน</div>
                       {/** Body */}
                    <div ></div>
                {/** footer */}
                    <div className="w-full h-10 rounded-b-xl bg-blue-300 flex items-center pl-3"> 
                        <div> หน่วยกิตรวม : </div> 
                    </div>
                </div>
             </div>
        </div>
    )
}

export default MyList
