import React  from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

function Register() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [university, setUniversity] = React.useState("");
  const [faculty, setFaculty] = React.useState("");
  const [major, setMajor] = React.useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => console.log(data);

  const handleNameChange = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value.replace(/[-0-9+&@#%?=~_|!:,.;,*:/]/g, "");
    if (name === "firstName") {
      setFirstName(newValue);
    }
    if (name === "lastName") {
      setLastName(newValue);
    }
    if (name === "university") {
      setUniversity(newValue);
    }
    if (name === "faculty") {
      setFaculty(newValue);
    }
    if (name === "major") {
      setMajor(newValue);
    }
  };


 function getUnivervity () {
       axios.get('https://ruplanner.herokuapp.com/universities').then((res)=> {

        console.log(res.data)
       })
    
 }


  function Register () {

      const newUser = {
        username : 'test' ,
        email : 'test@mail.com',
        password :'Cakesom121' ,
        major : '609f74493dfe8d13a47c8fd4'
      }

      axios
        .post('https://ruplanner.herokuapp.com/auth/local/register', {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          major : newUser.major
        })
        .then(response => {
          // Handle success.
          console.log('Well done!');
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
        })
        .catch(error => {
          // Handle error.
          console.log('An error occurred:', error.response);
        });
  }

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
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="สมชาย"
              name="firstName"
              value={firstName}
              {...register("firstName", {
                required: true,
              })}
              onChange={handleNameChange}
            />
            <span className="text-red-500 text-l italic">
              <span className="text-red-500 text-l italic">
                {errors.lastName?.type === "required" && "กรุณากรอกชื่อ"}
              </span>
            </span>
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-l   mb-2">
              นามสกุล
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="lastName"
              value={lastName}
              placeholder="รักเรียน"
              {...register("lastName", {
                required: true,
              })}
              onChange={handleNameChange}
            />
            <span className="text-red-500 text-l italic">
              {errors.lastName?.type === "required" && "กรุณากรอกนามสกุล"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-l    mb-2">
              อีเมล
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="email"
              placeholder="ramkaum@xxxx.com"
              {...register("email", {
                required: true,
              })}
            />
            <span className="text-red-500 text-l italic">
              {errors.email?.type === "required" && "กรุณากรอกอีเมล"}
            </span>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-l    mb-2">
              รหัสผ่าน
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="password"
              placeholder="******************"
              {...register("password", {
                required: true,
              })}
            />
            <span className="text-red-500 text-l italic">
              {errors.password?.type === "required" && "กรุณากรอกรหัสผ่าน"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700  text-l mb-2">
              มหาวิทยาลัย
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="university"
              value={university}
              placeholder="รามคำแหง"
              {...register("university", {
                required: true,
              })}
              onChange={handleNameChange}
            />
            <span className="text-red-500 text-l italic">
              {errors.university?.type === "required" && "กรุณากรอกมหาวิทยาลัย"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700   text-l  mb-2">
              คณะ
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="วิทยาศาสตร์"
              name="faculty"
              value={faculty}
              {...register("faculty", {
                required: true,
              })}
              onChange={handleNameChange}
            />
            <span className="text-red-500 text-l italic">
              {errors.faculty?.type === "required" && "กรุณากรอกคณะ"}
            </span>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700  text-l mb-2">
              สาขา
            </label>
            <input
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              name="major"
              value={major}
              placeholder="วิทยาการคอมพิวเตอร์"
              {...register("major", {
                required: true,
              })}
              onChange={handleNameChange}
            />
            <span className="text-red-500 text-l italic">
              {errors.university?.type === "required" && "กรุณากรอกสาขาวิชา"}
            </span>
          </div>
        </div>
       

        <div className="md:flex mt-6 justify-end ">
          <button
            className="bg-blue-500 hover:bg-blue-700  text-white rounded-xl py-2 px-4"
            type="submit"
            onClick={Register }
          >
            สมัครสมาชิก
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
