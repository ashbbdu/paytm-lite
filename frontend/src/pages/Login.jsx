import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/api";
import { loginSchema } from "../validationSchema";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema : loginSchema ,
    enableReinitialize :true,
    onSubmit: async (values) => {
      console.log(values, "values");
      try {
        const data = await axios.post(BASE_URL + "user/signin", {
          ...values,
        });
        if (data.status === 200) {
          localStorage.setItem("token" , data.data.token)
          localStorage.setItem("userDetails" , JSON.stringify(data.data.user))
          toast.success(data.data.message);
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });
  const {errors , touched} = formik;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white flex items-center justify-center flex-col px-4 py-6 rounded-md">
        <h2 className="text-center text-black text-3xl font-bold">Sign In</h2>
        <p className="text-slate-600 mt-2">
          Enter your credentials to access your account
        </p>
        <div className="h-[300px] w-full mt-6">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="useName">
                <b>Email</b>
              </label>{" "}
              <br></br>
              <input
                className=" w-full h-11 mt-1 rounded-md px-2 border border-slate-300"
                type="userName"
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
              />
              <div className="text-red-500">{errors.userName && touched.userName && errors.userName }</div>
            </div>
            <div className="mt-3">
              <label htmlFor="email">
                <b>Password</b>
              </label>
              <br></br>
              <input
                className="w-full h-11 mt-1 rounded-md px-2 border border-slate-300"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className="text-red-500">{errors.password && touched.password && errors.password }</div>
            </div>

            <button
              className="w-full bg-black text-white mt-5 p-3 rounded-md"
              type="submit"
            >
              Submit
            </button>

            <div className="text-center mt-5">
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
