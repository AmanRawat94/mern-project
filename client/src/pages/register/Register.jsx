import React, { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../../components/oAuth/OAuth";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputData = (e) => {
    let name = e.target.name;
    let value = e.target.value.trim();
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const res_data = await response.json();
      console.log(res_data);
      setLoading(false);

      if (response.ok) {
        setRegisterData({
          username: "",
          email: "",
          password: "",
        });
        toast.success("Registration Successfull");
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      // toast.error("error in registration");
      console.log("registraion", error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex justify-center text-4xl mb-5 sm:text-5xl">
              Sign Up
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <TextInput
                type="text"
                placeholder="Enter your username"
                autoComplete="on"
                id="username"
                name="username"
                value={registerData.username}
                onChange={handleInputData}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                type="email"
                placeholder="Enter your email"
                autoComplete="on"
                id="email"
                name="email"
                value={registerData.email}
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
                value={registerData.password}
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex justify-center gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
