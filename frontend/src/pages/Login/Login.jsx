import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button";

import {
  login,
} from "../../features/auth/authSlice";

function Login() {

    
  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    loading,
    error,
  } = useSelector(
    (state) => state.auth
  );

  const [formData,
    setFormData] =
    useState({

      email: "",
      password: "",
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

 const handleSubmit =
  async (e) => {

    e.preventDefault();

    console.log("Login button clicked");
    console.log(formData);

    const result =
      await dispatch(
        login(formData)
      );

    console.log(result);


    
    console.log(result.payload);
await dispatch(
 login(formData)
);


    if (
      result.meta.requestStatus ===
      "fulfilled"
    ) {
      navigate("/");
    }
  };

  return (
    <div
      className="
      max-w-md
      mx-auto
      py-20
      px-4"
    >

      <div
        className="
        border
        rounded-lg
        p-8
        shadow"
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6
          text-center"
        >
          Login
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <Input
            label="Email"
            type="email"
            name="email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            placeholder="Enter password"
          />

          {error && (
            <p
             className="
             text-red-500"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            >
            {loading
                ? "Loading..."
                : "Login"}
        </Button>

        </form>

      </div>

    </div>
  );
}

export default Login;