import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api_url } from "../../configs/api";

import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  TextField,
  Input,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Swal from "sweetalert2";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { useHistory } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";

const regexText = /^[ก-๏sa-zA-Z]+$/u;
const SignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
  lastName: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
  password: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%:^&:*])(?=.{6,})/,
      "รหัสผ่านต้องประกอบด้วย ตัวพิมพ์เล็ก พิมพ์ใหญ่ ตัวเลข อักขระพิเศษ และมากกว่า 6 ตัวอักษร"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "กรุณากรอกรหัสผ่านให้ตรงกัน"),
  universityData: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
  facultyData: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
  majorData: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
});

var university_id = null;
var faculty_id = null;
var major_id = null;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const [university, setUniversity] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [majors, setMajors] = useState([]);

  const [disable, setDisable] = useState(true);
  const [disableMajor, setDisableMajor] = useState(true);

  const [loading, setLoading] = useState(false);

  //------  Show / Hide Password ------
  const [values, setValues] = useState({
    showPassword: false,
  });
  const [valuesRe, setValuesRe] = useState({
    showPassword: false,
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();

  function getUniversityAPI() {
    axios
      .get("https://ruplanner.herokuapp.com/universities")
      .then((res) => {
        // console.log(res.data);
        setUniversity(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getfacultiesAPI_1(params) {
    axios
      .get( api_url +"/faculties?university=" + params)
      .then((res) => {
        //console.log(res.data);
        setFaculty(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getMajorsAPI_1(params) {
    axios
      .get(api_url +"/majors?faculty=" + params)
      .then((res) => {
        // console.log("-------------------------------");
        // console.log(res.data);
        setMajors(res.data);
        // console.log("ลองเข้าสุดท้าย");
        // console.log(university_id);
        // console.log(faculty_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getUniversityAPI();
  }, []);


  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
    setLoading(true);
    console.log("onSubmit");
    // if (university_id !== null) {
    //   // console.log("มีมหาลัยนีเแล้วจ้าาา");
    //   // console.log("2. university ID = ", university_id);
    // } else {
    //   // console.log("ไม่มหาลัยนี้ !!!!!!");
    //   // console.log("2. university ID = ", data.universityData);

    //   await axios
    //     .post(api_url +"/universities", {
    //       uni_name: data.universityData,
    //     })
    //     .then((res) => {
    //       // console.log("******  ลงทะเบียนมหาวิทยาลัยสำเร็จ ********");
    //       // console.log("Data = ", JSON.stringify(res.data));
    //       // console.log("Data ID = ", JSON.stringify(res.data._id));
    //       university_id = res.data._id;
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         console.log("error.response" + error.response);
    //       } else if (error.request) {
    //         console.log("error.request" + error.request);
    //       } else if (error.message) {
    //         console.log("error.message" + error.message);
    //       }
    //     });
    // }

    // if (faculty_id !== null) {
    //   // console.log("มีคณะนีเแล้วจ้า");
    //   // console.log("2. faculty ID = ", faculty_id);
    // } else {
    //   //ถ้าไม่พบ ID คณะ จะทำการเพิ่ม คณะและ มหาลัยเข้าไป
    //   // console.log("ไม่มีคณะนี้ !!!!!!");
    //   // console.log("ชื่อคณะ : ", data.facultyData);
    //   // console.log("รหัสมหาวิทยาลัย : ", university_id);

    //   await axios
    //     .post(api_url +"/faculties", {
    //       fac_name: data.facultyData,
    //       university: university_id,
    //     })
    //     .then((res) => {
    //       // console.log("******  ลงทะเบียนคณะสำเร็จ ********");
    //       // //console.log("Data = ", JSON.stringify(res.data));
    //       // //console.log("Data ID = ", JSON.stringify(res.data._id));
    //       // console.log("Data = ", res.data);
    //       // console.log("Data ID = ", res.data._id);
    //       faculty_id = res.data._id;
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         console.log("error.response" + error.response);
    //       } else if (error.request) {
    //         console.log("error.request" + error.request);
    //       } else if (error.message) {
    //         console.log("error.message" + error.message);
    //       }
    //     });
    // }

    // console.log("*** major -----------");
    // if (major_id !== null) {
    //   // ถ้าพบ ID  major
    //   // console.log("มีสาขานี้แล้วจ้าา");
    // } else {
    //   //ถ้าไม่พบ ID คณะ จะทำการเพิ่ม คณะและ มหาลัยเข้าไป
    //   // console.log("ไม่มีคณะนี้นะจ๊ะ !!!!!!");
    //   // console.log("1.marjor : ", data.majorData);
    //   // console.log("2.faculty : ", faculty_id);

    //   await axios
    //     .post(api_url +"/majors", {
    //       maj_name: data.majorData,
    //       faculty: faculty_id,
    //     })
    //     .then((res) => {
    //       // console.log("******  ลงทะเบียนสาขาสำเร็จ  ********");
    //       // console.log("Data = ", res.data);
    //       // console.log("Data ID = ", res.data._id);
    //       //  console.log("Data = ", JSON.stringify(res.data));
    //       //  console.log("Data ID = ", JSON.stringify(res.data._id));
    //       major_id = res.data._id;
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         console.log("error.response" + error.response);
    //       } else if (error.request) {
    //         console.log("error.request" + error.request);
    //       } else if (error.message) {
    //         console.log("error.message" + error.message);
    //       }
    //     });
    // }

    // await axios
    //   .post(api_url +"/auth/local/register", {
    //     username: data.firstName + " " + data.lastName,
    //     email: data.email,
    //     password: data.password,
    //     major: major_id,
    //   })
    //   .then((response) => {
    //     setLoading(false);
    //     // console.log("Well done!");
    //     // console.log("User profile", response.data.user);
    //     // console.log("Token", response.data.jwt);
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "ลงทะเบียนสำเร็จ",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     history.push("/login");
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log("error.response" + error.response);
    //       let statusErr = error.response.status;
    //       if (statusErr === 400) {
    //         Swal.fire({
    //           icon: "error",
    //           title: "Oops...",
    //           text: "อีเมลล์นี้ได้สมัครสมาชิกแล้ว",
    //         });
    //       }
    //     } else if (error.request) {
    //       console.log("error.request" + error.request);
    //     } else if (error.message) {
    //       console.log("error.message" + error.message);
    //     }
    //   });
  };

  return (
    <div className="min-h-screen   bg-blue-100 flex flex-col justify-center  font-base  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-9/12  bg-white p-10 mx-auto rounded-3xl shadow-lg"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-l mb-2">
              อีเมล
            </label>
            <TextField
              className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="email"
              placeholder="ramkhamhaeng@university.com"
              {...register("email", {
                required: true,
              })}
              inputProps={{
                style: { fontFamily: "Mitr" },
              }}
            />
            <span className="text-red-500 text-l italic">
              {errors.email?.type === "required" && "กรุณากรอกอีเมล"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-l    mb-2">
              รหัสผ่าน
            </label>
            <Input
              fullWidth
              className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type={values.showPassword ? "text" : "password"}
              placeholder="******************"
              {...register("password")}
              style={{ padding: 0, border: 0 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={(handleClickShowPassword) => {
                      setValues({
                        ...values,
                        showPassword: !values.showPassword,
                      });
                    }}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? (
                      <Visibility fontSize="small" />
                    ) : (
                      <VisibilityOff fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                style: { fontFamily: "Mitr", magin: "auto" },
              }}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.password && <p>{errors.password.message}</p>}
              </span>
            </span>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-l    mb-2">
              ยืนยันรหัสผ่าน
            </label>
            <Input
              fullWidth
              className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type={valuesRe.showPassword ? "text" : "password"}
              placeholder="******************"
              {...register("passwordConfirmation")}
              style={{ padding: 0, border: 0 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={(handleClickShowPassword) => {
                      setValuesRe({
                        ...values,
                        showPassword: !valuesRe.showPassword,
                      });
                    }}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {valuesRe.showPassword ? (
                      <Visibility fontSize="small" />
                    ) : (
                      <VisibilityOff fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                style: { fontFamily: "Mitr", magin: "auto" },
              }}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.passwordConfirmation && (
                  <p>{errors.passwordConfirmation.message}</p>
                )}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-l    mb-2">
              ชื่อ
            </label>
            <TextField
              className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="ราม"
              {...register("firstName")}
              inputProps={{
                style: { fontFamily: "Mitr" },
              }}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.firstName && <p>{errors.firstName.message}</p>}
              </span>
            </span>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-l   mb-2">
              นามสกุล
            </label>
            <TextField
              className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="รักเรียน"
              {...register("lastName")}
              inputProps={{
                style: { fontFamily: "Mitr" },
              }}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.lastName && <p>{errors.lastName.message}</p>}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-l mb-2">
              มหาวิทยาลัย
            </label>

            <Autocomplete
              id="combo-demo"
              freeSolo
              options={university}
              renderOption={(option) => (
                <Typography style={{ fontFamily: "Mitr" }}>
                  {option.uni_name}
                </Typography>
              )}
              getOptionLabel={(option) => option.uni_name}
              onChange={(event, value) => {
                university_id = value;
                if (value !== null) {
                  university_id = value._id;
                  getfacultiesAPI_1(university_id);
                }
              }}
              renderInput={(params) => (
                <TextField
                  className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="รามคำแหง"
                  {...register("universityData")}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    style: { fontFamily: "Mitr" },
                  }}
                  onClick={() => setDisable(false)}
                />
              )}
            />

            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.university && <p>{errors.university.message}</p>}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700   text-l  mb-2">
              คณะ
            </label>
            <Autocomplete
              id="combo-faculty"
              freeSolo
              disabled={disable}
              options={faculty}
              renderOption={(option) => (
                <Typography style={{ fontFamily: "Mitr" }}>
                  {option.fac_name}
                </Typography>
              )}
              getOptionLabel={(option) => option.fac_name}
              onChange={(event, value) => {
                faculty_id = value;
                if (value !== null) {
                  faculty_id = value._id;
                  getMajorsAPI_1(faculty_id);
                }
              }}
              renderInput={(params) => (
                <TextField
                  className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="วิทยาศาสตร์"
                  {...register("facultyData")}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    style: { fontFamily: "Mitr" },
                  }}
                  onChange={() => setDisableMajor(false)}
                />
              )}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.faculty && <p>{errors.faculty.message}</p>}
              </span>
            </span>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700  text-l mb-2">
              สาขา
            </label>
            <Autocomplete
              id="combo-major"
              freeSolo
              disabled={disableMajor}
              options={majors}
              renderOption={(option) => (
                <Typography style={{ fontFamily: "Mitr" }}>
                  {option.maj_name}
                </Typography>
              )}
              getOptionLabel={(option) => option.maj_name}
              onChange={(event, value) => {
                major_id = value;
                if (value !== null) {
                  major_id = value._id;
                }
              }}
              renderInput={(params) => (
                <TextField
                  className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="วิทยาการคอมพิวเตอร์"
                  {...register("majorData")}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    style: { fontFamily: "Mitr" },
                  }}
                />
              )}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.major && <p>{errors.major.message}</p>}
              </span>
            </span>
          </div>
        </div>

        <div className="md:flex mt-6 justify-end ">
          <button
            className="bg-blue-500 hover:bg-blue-700  text-white rounded-xl py-2 px-4"
            type="submit"
          >
            {loading ? (
              <CircularProgress style={{ color: "#30BDFF" }} size={20} />
            ) : (
              "สมัครสมาชิก"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
