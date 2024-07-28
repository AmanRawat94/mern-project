import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import OAuth from "../../components/oAuth/OAuth";

const Login = () => {
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputData = (e) => {
    let name = e.target.name;
    let value = e.target.value.trim();
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return dispatch(signInFailure());
    }
    try {
      // setLoading(true);
      dispatch(signInStart());
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      console.log(response);

      const res_data = await response.json();
      if (response.ok === false) {
        dispatch(signInFailure(res_data));
      }
      console.log(res_data);
      // setLoading(false);
      // dispatch(signInSuccess(data));

      if (response.ok) {
        setLoginData({
          email: "",
          password: "",
        });
        toast.success("Login Successfully");
        dispatch(signInSuccess(res_data));
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      // toast.error("error in login");
      console.log("login error", error);
      // setLoading(false);
      dispatch(signInFailure());
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-center text-4xl mb-5 sm:text-5xl">
              Sign In
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                type="email"
                placeholder="Enter your email"
                autoComplete="on"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleInputData}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                type="password"
                placeholder="Enter your password"
                autoComplete="on"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputData}
              />
            </div>
            <Button
              gradientDuoTone="purpleToBlue"
              type="sumit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex justify-center gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
