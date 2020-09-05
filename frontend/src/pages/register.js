import React from "react";
import styled from "styled-components";

import { CenterChild, Card, Button } from "../styles";
import { Input, Checkbox } from "../components/FormElements";

import { LoginWrapper } from "./login";
import { Link } from "react-router-dom";
const RegisterWrapper = styled(LoginWrapper)``;

export const Register = () => {
  return (
    <RegisterWrapper>
      <div className="auth-form">
        Cform
        <Card>
          <h3>Sign Up</h3>
          <p>Start getting submissions in 1 minute, easy peasy!</p>
          <div className="form-input">
            <Input placeholder="Full Name" />
          </div>
          <div className="form-input">
            <Input placeholder="Email" />
          </div>
          <div className="form-input">
            <Input placeholder="Password" type="password" />
          </div>
          <div className="form-input">
            <Checkbox label="I have read Terms & Conditions and Privacy Policy" />
          </div>
          <div className="form-input">
            <Checkbox label="I’d like to receive emails about the news and updates" />
          </div>

          <Button margin="20px 0">sign up </Button>
        </Card>
        <p className="info">
          Already have a Getform account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </RegisterWrapper>
  );
};
