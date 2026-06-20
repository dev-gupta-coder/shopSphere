// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";

// function Register() {
//   return (
//     <div className="max-w-md mx-auto py-20 px-4">
//       <div className="border rounded-lg p-8 shadow">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Create Account
//         </h1>

//         <form className="space-y-4">
//           <Input
//             label="Full Name"
//             placeholder="Enter full name"
//           />

//           <Input
//             label="Email"
//             type="email"
//             placeholder="Enter email"
//           />

//           <Input
//             label="Password"
//             type="password"
//             placeholder="Enter password"
//           />

//           <Input
//             label="Confirm Password"
//             type="password"
//             placeholder="Confirm password"
//           />

//           <Button className="w-full">
//             Register
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Register;



import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button";

import { register } from "../../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    const result = await dispatch(
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
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
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
          >
            {loading
              ? "Loading..."
              : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Register;