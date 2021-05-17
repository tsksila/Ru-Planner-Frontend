import React, { useState } from "react";
import { useForm } from "react-hook-form";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center  font-base font-medium text-xl">
          เข้าสู่ระบบ
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 rounded-lg shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold font-base  text-gray-600 block">
              อีเมล
            </label>
            <input
              type="text"
              {...register("email", { required: true })}
              className="w-full p-2 border-2 border-gray-700 border-opacity-75    rounded mt-5 "
            />
            <div className="text-sm text-red-300 font-base">
              {errors.email?.type === "required" && "กรุณากรอกชื่อผู้ใช้"}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold font-base  text-gray-600 block">
              พาสเวิร์ด
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full p-2 border-2 border-gray-700  border-opacity-75 rounded mt-5 "
            />
            <div className="text-sm text-red-300 font-base">
              {errors.password?.type === "required" && "กรุณากรอกรหัสผ่าน"}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4   checked:bg-blue-600 checked:border-transparent"
              />
              <label
                htmlFor=""
                className="ml-2 text-sm  text-gray-600 font-base"
              >
                จดจำรหัสผ่าน
              </label>
            </div>
            <div>
              <a
                href=""
                className="font-base font-medium text-sm text-gray-500"
              >
                ลืมรหัสผ่าน?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 font-base text-white bg-black hover:bg-gray-900  focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50  rounded-lg "
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>

        <div className="flex items-end mt-5">
          <a href="" className="font-base font-medium text-sm text-gray-800">
            สมัครสมาชิก...
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
