import React, { useState } from "react";
import styled from "styled-components";

import { Card, Button } from "../styles";
import { Input, Checkbox } from "../components/FormElements";

import { LoginWrapper } from "./login";
import { Link } from "react-router-dom";
const RegisterWrapper = styled(LoginWrapper)``;

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  function handleInputChange(key, value) {
    setFormData((state) => ({ ...state, [key]: value }));
  }

  function handleSubmit() {
    console.log(formData);
  }

  return (
    <RegisterWrapper>
      <div className="auth-form">
        <Card>
          <h1 className="title">Sign Up</h1>
          <p className="subtitle">
            Start getting submissions in 1 minute, easy peasy!
          </p>
          <div className="form-input">
            <Input
              placeholder="Full Name"
              value={formData["name"]}
              onChange={(val) => handleInputChange("name", val)}
              name="name"
            />
          </div>
          <div className="form-input">
            <Input
              placeholder="Email"
              value={formData["email"]}
              onChange={(val) => handleInputChange("email", val)}
              name="email"
            />
          </div>
          <div className="form-input">
            <Input
              placeholder="Password"
              secureEntry
              value={formData["password"]}
              onChange={(val) => handleInputChange("password", val)}
              name="password"
            />
          </div>
          <div className="form-input">
            <Checkbox label="I have read Terms & Conditions and Privacy Policy" />
          </div>
          <div className="form-input">
            <Checkbox label="I’d like to receive emails about the news and updates" />
          </div>

          <Button margin="20px 0" onClick={() => handleSubmit()}>
            sign up
          </Button>
        </Card>
        <p className="info">
          Already have a Cform account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </RegisterWrapper>
  );
};
