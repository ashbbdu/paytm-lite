import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const formik = useFormik({
        initialValues: {
          firstName : "",
          lastName : "",
          email: "",
          password: "",
        },
        onSubmit: (values) => {
          console.log(values, "values");
        },
      });
  return (
    <div className="flex flex-col items-center justify-center h-full">
    <div className="bg-white flex items-center justify-center flex-col px-4 py-6 rounded-md">
      <h2 className="text-center text-black text-3xl font-bold">Sign Up</h2>
      <p className="text-slate-600 mt-2">
        Enter your information to create your account
      </p>
      <div className="h-[300px] w-full mt-6">
        <form onSubmit={formik.handleSubmit}>
        <div>
            <label htmlFor="firstName">
              <b>First tName</b>
            </label>{" "}
            <br></br>
            <input
              className=" w-full h-11 mt-1 rounded-md px-2 border border-slate-300"
              type="firstName"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </div>
          <div>
            <label htmlFor="lastName">
              <b>Last Name</b>
            </label>{" "}
            <br></br>
            <input
              className=" w-full h-11 mt-1 rounded-md px-2 border border-slate-300"
              type="lastName"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </div>
          <div>
            <label htmlFor="email">
              <b>Email</b>
            </label>{" "}
            <br></br>
            <input
              className=" w-full h-11 mt-1 rounded-md px-2 border border-slate-300"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
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
          </div>

          <button
            className="w-full bg-black text-white mt-5 p-3 rounded-md"
            type="submit"
          >
            Submit
          </button>

          <div className="text-center mt-5">
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Signup