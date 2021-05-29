import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TextField, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Swal from "sweetalert2";



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
  university: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
  faculty: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
  major: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .matches(regexText, "กรุณากรอกแต่ตัวอักษรเท่านั้น"),
  // age: yup.number().required().positive().integer(),
  // website: yup.string().url(),
});

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
  let major_id = null;

  const getDataAPI = async () => {
    const universityAPI = "https://ruplanner.herokuapp.com/universities";
    const facultyAPI = "https://ruplanner.herokuapp.com/faculties";
    const majorsAPI = "https://ruplanner.herokuapp.com/majors";

    const getUniversity = await axios.get(universityAPI);
    const getFaculty = await axios.get(facultyAPI);
    const getMajors = await axios.get(majorsAPI);
    axios.all([getUniversity, getFaculty, getMajors]).then(
      axios.spread((...allData) => {
        const allUnversity = allData[0].data;
        const allFaculty = allData[1].data;
        const allMajors = allData[2].data;

        // console.log("Date Unversity : ", allUnversity);
        // console.log("Date Faculty : ", allFaculty);
        // console.log("Date Major : ", allMajors);
        // console.log(allFaculty.data.universities);

        setUniversity(allUnversity);
        setFaculty(allFaculty);
        setMajors(allMajors);
      })
    );
  };
  useEffect(() => {
    getDataAPI();
  }, []);

  const onSubmit = (data) => {
    //alert(JSON.stringify(data));
    // console.log(data.major._id);
    // console.log("test Submit major_id = " + major_id);
    axios
      .post("https://ruplanner.herokuapp.com/auth/local/register", {
        username: data.firstName,
        email: data.email,
        password: data.password,
        major: data.major_id,
      })
      .then((response) => {
        // console.log("Well done!");
        // console.log("User profile", response.data.user);
        // console.log("Token", response.data.jwt);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "ลงทะเบียนสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });

        //history.push("/");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        console.log(error.response.status);
        let statusErr = error.response.status;
        if (statusErr === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "อีเมลล์นี้ได้สมัครสมาชิกแล้ว",
            //footer: "<a href>Why do I have this issue?</a>",
          });
        }
      });
  };

  return (
    <div className="min-h-screen   bg-blue-100 flex flex-col justify-center  font-base  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-9/12  bg-white p-10 mx-auto rounded-3xl shadow-lg"
      >
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
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-l    mb-2">
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
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-l    mb-2">
              รหัสผ่าน
            </label>
            <TextField
              className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="password"
              placeholder="******************"
              {...register("password")}
              inputProps={{
                style: { fontFamily: "Mitr" },
              }}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.password && <p>{errors.password.message}</p>}
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
              options={university}
              // getOptionSelected={(option, value) =>
              //   option._id === value._id
              //     ? console.log("ได้ผล : ", value._id)
              //     : console.log("ไม่ได้ผล")
              // }
              renderOption={(option) => (
                <Typography style={{ fontFamily: "Mitr" }}>
                  {option.uni_name}
                </Typography>
              )}
              getOptionLabel={(option) => option.uni_name}
              renderInput={(params) => (
                <TextField
                  className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="รามคำแหง"
                  {...register("university")}
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
              options={faculty}
              renderOption={(option) => (
                <Typography style={{ fontFamily: "Mitr" }}>
                  {option.fac_name}
                </Typography>
              )}
              getOptionLabel={(option) => option.fac_name}
              renderInput={(params) => (
                <TextField
                  className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="วิทยาศาสตร์"
                  {...register("faculty")}
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
              options={majors}
              renderOption={(option) => (
                <Typography style={{ fontFamily: "Mitr" }}>
                  {option.maj_name}
                </Typography>
              )}
              getOptionLabel={(option) => option.maj_name}
              getOptionSelected={(option, value) =>
                option.name === value.name
                  ? (major_id = value._id)
                  : "false getOptionSelected majors"
              }
              onChange={(event, value) => console.log("major = " + value)}
              renderInput={(params) => (
                <TextField
                  className="appearance-none block w-full bg-white text-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="วิทยาการคอมพิวเตอร์"
                  {...register("major")}
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
            สมัครสมาชิก
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
