import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
// import { getUser } from "../actions/auth";

export const Login = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(login(formData, navigate));
    // dispatch(getUser(formData));

    const response = await axios.post(
      "http://localhost:5000/home/login",
      JSON.stringify(formData),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    localStorage.setItem("token", JSON.stringify(response.data.token));
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form_cont">
      <h2 className="text">Login</h2>
      <form
        aria-autocomplete="off"
        className="login_form"
        onSubmit={handleSubmit}
      >
        <Input
          name="username"
          label="Username"
          type="username"
          placeholder="Username"
          handleChange={handleChange}
          autoFocus
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          handleChange={handleChange}
        />

        <button
          className="l_btn"
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Log In
        </button>
      </form>
      <button
        className="link_btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register
      </button>
    </div>
  );
};
