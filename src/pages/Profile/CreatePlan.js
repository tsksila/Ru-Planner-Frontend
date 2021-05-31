import React, { useState, useEffect } from "react"
import {If,Else,Then} from 'react-if'

import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete"
import Cancel from "@material-ui/icons/CancelRounded"
import {CircularProgress} from '@material-ui/core';
import axios from "axios"

/* dialog */
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
});

function CreatePlan() {
  /** ข้อมูลรายวิชา ในเทอม*/
  const [termSubj, setTermSubj] = useState([])
  const [totalCredit, setTotalCredit] = useState(0)

  /** ข้อมูล ปีและเทอม */
  const [year, setYear] = useState('1')
  const [term, setTerm] = useState('1')

  /** ข้อมูล รายวิชาทั่งหมด */
  const [subjectList, setSubjectList] = useState([])

  /** ข้อมูลวิชา */
  const [subjID ,setSubjID] = useState()
  const [subjCode, setSubjCode] = useState()
  const [subjName, setSubjName] = useState()
  const [subjCredit, setSubjCredit] = useState()

  const [termList, setTermList] = useState([])
  const [planCredit, setPlanCredit] = useState(0)
  const [planname , setPlanname] = useState() 


  const [loading , setLoading] = useState(false)
  const [usePlan , setUsePlan] = useState(false)



  /** get all subject api */
  useEffect(() => {
     
    let mounted = true
     axios.get("https://ruplanner.herokuapp.com/subjects").then((res) => {
      if (mounted) {
        setSubjectList(res.data);
      }
      
    })
    return () => {
      mounted = false
    }
  });
 
  /**  Total credit term */
  useEffect(() => {
    const reducer = termSubj.reduce(
      (total, item) => total + item.subjCredit,
      0
    );
    setTotalCredit(reducer);
  }, [termSubj]);

   /**  Total credit plan */
   useEffect(() => {

    const reducer = termList.reduce((total, item) => {
      return (
        total + item.subject.reduce((total, subj) => total + subj.subjCredit, 0)
      );
    }, 0);
    setPlanCredit(reducer);

    termList.sort((a,b) =>    parseInt(a.year+a.term) - parseInt(b.year+b.term))

  }, [termList]);

  function add_new_subject(input) {
    SwalWithStyle.fire({
      title: 'เพิ่มวิชาใหม่',
      text: 'กรุณากรอกรายละเอียดวิชา',
      html:
      '<table>'+
      `<tr><td><lable>รหัสวิชา</lable></td><td><input id="swal-input1"  value= ${input.toUpperCase()} class="swal2-input"></td></tr>`+
      '<tr><td><lable>ชื่อวิชา </lable></td><td><input id="swal-input2" class="swal2-input"></td></tr>'+
      '<tr><td><lable>หน่วยกิต</lable></td><td><input id="swal-input3" class="swal2-input"></td></tr>'+
      '</table>' ,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'เพิ่มวิชาใหม่',
      showLoaderOnConfirm: true,
      preConfirm: () => {
          const subjCode = document.getElementById('swal-input1').value.toUpperCase()
          const subjName = document.getElementById('swal-input2').value
          const subjCredit = document.getElementById('swal-input3').value

          if(!isNaN(subjCredit)  && subjName !== '' && subjCode !== '') {
              const body = {
                subj_code : subjCode,
                subj_fullname :subjName ,
                subj_credit : subjCredit
                }

              axios.post('https://ruplanner.herokuapp.com/subjects' , body , ).then((res) => {
                console.log(res.data)
                setSubjectList((prev) => [res.data , ...prev])
              }).catch((err) => {
                Swal.showValidationMessage(
                  `ผิดพลาด : ${err}`
                )
                
              })
          }else {
            Swal.showValidationMessage(
              `กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน`
            )
          }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'เพิ่มวิชาสำเร็จ!',
          text : 'ขอบคุณที่ท่านเป็นส่วนหนึ่งในการช่วยพัฒนาชุมชนของเรา!' ,
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
    
  }

  function set_subject(value) {
    setSubjID(value ? value.id :'') 
    setSubjCode(value ? value.subj_code : "");
    setSubjName(value ? value.subj_fullname : "");
    setSubjCredit(value ? value.subj_credit : "");
  }

  function add_term_subject() {
    if (subjCode || subjName || subjCredit !== "") {
      const checkdupicate = termSubj.filter(
        (subj) => subj.subjCode === subjCode
      );
      if (checkdupicate.length === 0) {
        setTermSubj((prev) => [...prev, { subjID,subjCode, subjName, subjCredit }]);
      } else {
        const SwalWithStyle = Swal.mixin({
          customClass: {
            title: "font-base",
            confirmButton:
              "p-3  bg-blue-300 font-base  rounded-xl focus:outline-none  text-blue-800 ",
          },
          buttonsStyling: false,
        });
        SwalWithStyle.fire({
          icon: "error",
          title: "คุณมีวิชานี้อยู่ในรายการอยู่แล้ว!",
        });
      }
    } else {
      const SwalWithStyle = Swal.mixin({
        customClass: {
          title: "font-base",
          confirmButton:
            "p-3  bg-blue-300 font-base  rounded-xl focus:outline-none  text-blue-800 ",
        },
        buttonsStyling: false,
      });
      SwalWithStyle.fire({
        icon: "error",
        title: "กรุณากำหนดรายละเอียดวิชา!",
      });
    }
  }

  function remove_term_subject(code) {
    setTermSubj((prev) => prev.filter((subj) => subj.subjCode !== code))
  }

  function add_plan_term() {
    if (termSubj.length === 0) {
      SwalWithStyle.fire({
        icon: "warning",
        title: "กรุณาเพิ่มวิชาในภาคเรียน!",
      });
      return;
    }
    setTermList((prev) => {
      const checkdupicate = prev.filter(
        (data) => data.year === year && data.term === term
      );

      if (checkdupicate.length === 0) {
        return [...prev, { year, term, subject: termSubj }];
      } else {
        SwalWithStyle.fire({
          icon: "error",
          title: "มีภาคเรียนนี้อยู่แล้ว!",
        });
        return [...prev];
      }
    });
    setTermSubj([]);
  }

  function remove_plan_term(select){
     setTermList((prev) => prev.filter((term) => term !== select)) 
  }

  function add_new_plan() {

    setLoading(true)
      if(!planname) {
        SwalWithStyle.fire({
          icon: "error",
          title: "กรุณากรอกชื่อแผนการเรียน!",
        });
        setLoading(false)
      }else if (termList.length <= 0 ) {
        SwalWithStyle.fire({
          icon: "warning",
          title: "กรุณาเพิ่มภาคการศึกษา!",
        });
        setLoading(false)
        return 
      }
      else{
          let plan_id =""
          const body = {
            plan_name : planname,
            user : localStorage.getItem('user_id')
          }

          /** create plan */
          axios.post('https://ruplanner.herokuapp.com/plans' , body , {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
          }).then( async (res) => {
            plan_id = res.data.id

            /** add term */
            await Promise.all(termList.map( async(term) => {
                const data ={
                    term_year :  term.year  ,
                    term_num : term.term ,
                    plan : plan_id ,
                    subjects : [...term.subject.map(item => item.subjID)]
                } 
                await axios.post('https://ruplanner.herokuapp.com/plan-terms' , data , {
                  headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') }
                }).then(({data})=> {
                   console.log(data)
                })
              }))


            setLoading(false)
            setUsePlan(true)
          })

          
      }
     
      


  }

  return (
    <div className="  grid  grid-cols-1  md:grid-cols-2  ">
      {/** Add term */}
      <div className="mx-auto w-full  p-5   ">
        <div className="w-full bg-white rounded-xl float-right shadow-lg text-sm">
          {/** Head */}
          <div className="h-10  bg-blue-300 rounded-t-xl  flex  items-center justify-end   ">
            <label className=" ml-2 mr-2">ปี</label>
            <select
              defaultValue={year}
              onChange={(e) => setYear(e.target.value)}
              className=" rounded-md  focus:outline-none mr-2"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
            <label className=" ml-2  mr-2">เทอม</label>
            <select
              defaultValue={term}
              onChange={(e) => setTerm(e.target.value)}
              className=" rounded-md  focus:outline-none mr-2"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">S</option>
            </select>
          </div>
          {/** add subject field */}
          <div className="flex flex-row bg-blue-100 p-3  ">
            <div className="flex flex-col w-3/12 mr-1">
              <label>รหัสวิชา</label>

              <Autocomplete
                id="sub-code"
                getOptionSelected={(option, value) => option.subj_code === value.subj_code}
                filterOptions={(options,  params) => {
                    const filtered = defaultFilterOptions(options, params).slice(0, OPTIONS_LIMIT);

                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        subj_code: `เพิ่ม "${params.inputValue}"`,
                      });
                    }
                    return filtered;
                  }
                }
                options={subjectList}
                getOptionLabel={(option) =>  {
                      if ( typeof option === 'string') {
                        return option;
                      }
                      if (option.inputValue) {
                        return option.inputValue;
                      }
                        return option.subj_code;
                      }}
                onChange={(event, value) => {
                      if (typeof value === 'string') {
                          console.log(typeof value)
                      } else if (value && value.inputValue) {
                            add_new_subject(value.inputValue)
                      } else {
                        set_subject(value)
                      }
                }}
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
            <div className="flex flex-col w-8/12 mr-1">
              <label>ชื่อวิชา</label>
              <input
                className="rounded-md  focus:outline-none w-full pl-2"
                defaultValue={subjName || ""}
              />
            </div>
            <div className="flex flex-col w-2/12">
              <label>หน่วยกิต</label>
              <input
                type="number"
                min="0"
                className="rounded-md  focus:outline-none w-full pl-2  "
                defaultValue={subjCredit || ""}
              />
            </div>
          </div>
          <div className="flex bg-blue-100  justify-end pb-2 pr-3">
            <button
              className="px-4  bg-white   rounded-xl  shadow-lg focus:shadow-none focus:outline-none"
              onClick={add_term_subject}
            >
              เพิ่มวิชา
            </button>
          </div>
          {/** Subject list */}

          {termSubj.map((item, i) => {
            return (
              <div
                className="m-2 h-8 bg-blue-100 rounded-md p-1  flex justify-between items-center "
                key={i}
              >
                <div className="w-3/12 mr-1"> {item.subjCode} </div>

                <div className="w-7/12 mr-1 truncate">{item.subjName}</div>
                <div className=" w-1/12 mr-1"> {item.subjCredit} </div>

                <div
                  className=" w-1/12 flex justify-end text-red-400 cursor-pointer mr-2 hover:text-red-600  "
                  onClick={() => remove_term_subject(item.subjCode)}
                >
                  <Cancel />
                </div>
              </div>
            );
          })}

          {/** Add term */}

          <div className="bg-blue-300 h-10 rounded-b-xl flex justify-between p-2">
            <div className="p-2 rounded-md bg-white flex items-center">หน่วยกิต : {`${totalCredit}`} </div>
            <button
              className=" px-4 bg-white rounded-xl shadow-lg focus:shadow-none focus:outline-none "
              onClick={add_plan_term}
            >
              เพิ่มภาคเรียน
            </button>
          </div>
        </div>
      </div>

      {/** Add Plan */}
      <div className="  mx-auto w-full  p-5  " style={{ height: "80vh" }} >
        <div className="w-full bg-white rounded-xl float-right shadow-lg h-full  flex flex-col justify-between ">
          {/** Head */}
          <div className="h-10  bg-blue-300 rounded-t-xl  flex  items-center justify-start  ">
            <label className=" ml-2 mr-2 w-2/12 ">ชื่อแผน</label>
            <input className=" rounded-md  focus:outline-none mr-5 pl-2 w-10/12" defaultValue={planname}  onChange={(e) => setPlanname(e.target.value)} />
          </div>

          {/** Term list */}
          <div className="h-full overflow-y-auto">
            {termList.length === 0 ? (
              <div className="text-xl flex justify-center text-gray-300 pt-5">
                ไม่มีรายการ ..
              </div>
            ) : (``)}
            {termList.map((term, i) => (
              <div  className="bg-white  rounded-lg  border-2 border-blue-100 m-2" key={i} >
                {/** term headder */}
                <div className="bg-blue-200 h-8 rounded-t-lg pl-2  flex justify-between items-center">
                  <div>
                    <span>ปี {term.year}</span> <span>เทอม { term.term === '3' ? 'ฤดูร้อน' : term.term}</span>
                  </div>
                  <div className=" text-red-400 cursor-pointer mr-2 hover:text-red-600 " onClick={()=> remove_plan_term(term)}>
                    <Cancel />
                  </div>
                </div>
                {/** Subject list */}
                {term.subject.map((subj, i) => (
                  <div className="m-2 h-8 bg-blue-100 rounded-md p-1   flex  items-center " key={i}>
                    <div className="w-3/12 mr-1"> {subj.subjCode} </div>
                    <div className="w-7/12 mr-1 truncate">{subj.subjName}</div>
                    <div className=" w-1/12 mr-1"> {subj.subjCredit} </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/** Add Plan */}
          <div className="bg-blue-300 h-10 rounded-b-xl flex justify-between p-2   ">
            <div className="p-2 rounded-md bg-white flex items-center">หน่วยกิตรวม : {`${planCredit}`}</div>
            <If condition={usePlan} >
              <Then>
                 <button className=" w-40 px-4 bg-blue-100 rounded-xl shadow-lg text-blue-500 focus:shadow-none focus:outline-none " >
                    ใช้แผนนี้
                </button>
              </Then>
              <Else>
                <button className=" w-40 px-4 bg-white rounded-xl shadow-lg focus:shadow-none focus:outline-none " onClick={add_new_plan}>
                  {loading ? ( <CircularProgress style={{'color': '#30BDFF'}} size={20} /> ) : "สร้างแผนการเรียน"}
                </button>
              </Else>
            </If>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePlan;
