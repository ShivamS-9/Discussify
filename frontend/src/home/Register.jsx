import React, { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

export const Register = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    age: "",
    contactNum: "",
    password: "",
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData, navigate));
    props.onFormSwitch("login")
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form_cont">
      <h2 className="text">Register</h2>
      <form aria-autocomplete="off" className="register_form" onSubmit={handleSubmit}>
        <Input
          name="firstName"
          label="FirstName"
          placeholder="First Name"
          handleChange={handleChange}
          autoFocus
        />
        <Input
          name="lastName"
          label="LastName"
          placeholder="Last Name"
          handleChange={handleChange}
        />
        <Input
          name="username"
          label="Username"
          placeholder="Username"
          handleChange={handleChange}
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          handleChange={handleChange}
        />
        <Input
          name="age"
          label="Age"
          placeholder="Age"
          type="number"
          handleChange={handleChange}
        />
        <Input
          name="contactNum"
          label="ContactNum"
          placeholder="Contact Number"
          handleChange={handleChange}
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
          Register
        </button>
      </form>
      <button className="link_btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login
      </button>
    </div>
  );
};
