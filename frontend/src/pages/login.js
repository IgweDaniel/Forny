import React, { useState } from "react";
import styled from "styled-components";
import { CenterChild, Card, Button } from "../styles";
import { Input } from "../components/FormElements";
import { Link, useHistory } from "react-router-dom";

export const LoginWrapper = styled(CenterChild)`
  margin: 38px auto;
  width: 80%;

  .auth-form {
    /* width: 100%; */
    max-width: 930px;
    min-height: 400px;
    margin: 48px auto;
  }
  .title {
    font-weight: 600;
    margin: 10px 0;
  }
  .subtitle {
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
  const [formData, setFormData] = useState({ email: "", password: "" });
  const history = useHistory();
  function handleInputChange(key, value) {
    setFormData((state) => ({ ...state, [key]: value }));
  }

  function handleSubmit() {
    history.push("/forms");
    console.log(formData);
  }
  return (
    <LoginWrapper>
      <div className="auth-form">
        <Card>
          <h1 className="title">Login</h1>
          <p className="subtitle">
            Welcome back
            <span role="img" aria-label="hand-">
              👋
            </span>
          </p>

          <div className="form-input">
            <Input
              value={formData["email"]}
              placeholder="Email Address"
              onChange={(val) => handleInputChange("email", val)}
              name="email"
            />
          </div>
          <div className="form-input">
            <Input
              value={formData["password"]}
              placeholder="Password"
              secureEntry
              name="password"
              onChange={(val) => handleInputChange("password", val)}
            />
          </div>
          <div className="form-input align-left">
            <Link to="/register">Forgot Password</Link>
          </div>
          <Button margin="20px 0" onClick={() => handleSubmit()}>
            login
          </Button>
        </Card>
        <p className="info">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </LoginWrapper>
  );
};
