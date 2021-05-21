import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";


/*
const dataForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  university: "",
  faculty: "",
};
*/

// Validation with REGEX ^[+-]?\d*(?:[.,]\d*)?$
const rx_text = /[^0-9]{20}/;

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
    const onSubmit = (data) => console.log(data);
  /*
    const [text, setText] = useState();

  function handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam === "firstName") {
        if (val !== "" && !String(val)) {
            
        //err = <strong>Your age must be a number</strong>;
      }
    }
   // this.setState({ errors: err });
  }
*/
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            ชื่อ
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="สมชาย"
            name="firstName"
            {...register("firstName", {
              required: "This input is required.",
              pattern: {
                value: rx_text,
                message: "กรุณากรอกตัวอักษรเท่านั้น",
              },
            })}
          />
          <p className="text-red-500 text-xs italic">
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
          </p>
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            นามสกุล
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="รักเรียน"
            {...register("lastName", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs italic">
            {errors.lastName?.type === "required" && "กรุณากรอกนามสกุล"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
          <p className="text-red-500 text-xs italic">
            {errors.email?.type === "required" && "กรุณากรอกอีเมล"}
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
          <p className="text-red-500 text-xs italic">
            {errors.password?.type === "required" && "กรุณากรอกรหัสผ่าน"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            มหาวิทยาลัย
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="รามคำแหง"
            {...register("university", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs italic">
            {errors.university?.type === "required" && "กรุณากรอกรหัสผ่าน"}
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            คณะ
          </label>
          <input
            className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="วิทยาศาสตร์"
            name="faculty"
            {...register("faculty", {
              required: true,
            })}
          />
          <p className="text-red-500 text-xs italic">
            {errors.faculty?.type === "required" && "กรุณากรอกรหัสผ่าน"}
          </p>
        </div>
      </div>

      <div className="md:flex mt-6 justify-end ">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
          type="submit"
        >
          สมัครสมาชิก
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
