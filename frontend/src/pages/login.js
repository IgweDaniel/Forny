import React from "react";
import styled from "styled-components";
import { CenterChild, Card, Button } from "../styles";
import { Input } from "../components/FormElements";
import { Link } from "react-router-dom";

export const LoginWrapper = styled(CenterChild)`
  margin: 38px auto;
  width: 80%;

  .auth-form {
    /* width: 100%; */
    max-width: 930px;
    min-height: 400px;
    margin: 48px auto;
  }

  .form-input {
    margin: 20px 0 0;
  }
  .form-input.align-left {
    display: flex;
    justify-content: flex-end;
  }
  .info {
    text-align: center;
    margin: 15px 0;
  }
`;

export const Login = () => {
  return (
    <LoginWrapper>
      <div className="auth-form">
        Cform
        <Card>
          <h3>Login</h3>
          <p>Welcome back 👋</p>

          <div className="form-input">
            <Input placeholder="Email Address" />
          </div>
          <div className="form-input">
            <Input placeholder="Password" type="password" />
          </div>
          <div className="form-input align-left">
            <Link to="/register">Forgot Password</Link>
          </div>
          <Button margin="20px 0">login</Button>
        </Card>
        <p className="info">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </LoginWrapper>
  );
};
