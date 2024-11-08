import React from 'react';
import { MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <MDBInput wrapperClass="mb-4" placeholder="Email address" id="email" type="email" />
      <MDBInput wrapperClass="mb-4" placeholder="Password" id="password" type="password" />

      <div className="checkbox-container">
        <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="Remember me"/>
        <a href="/auth/forgot-password" className="forgot-password">Forgot password?</a>
      </div>

      <button type="submit" className="login-button">Sign In</button>

      <div className="separator">
        <span>OR</span>
      </div>

      <MDBBtn className="social-button facebook" tag="a">
        <MDBIcon fab icon="facebook-f" size="lg" />
        CONTINUE WITH FACEBOOK
      </MDBBtn>

      <MDBBtn className="social-button google" tag="a">
        <MDBIcon fab icon="google" size="lg" />
        CONTINUE WITH GOOGLE
      </MDBBtn>

      <p className="text-center mt-3">
        Not a member? <a href="/auth/register">Register Here</a>
      </p>
    </div>
  );
};

export default Login;
