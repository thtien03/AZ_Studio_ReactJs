import React from 'react';
import { MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <MDBInput wrapperClass="mb-4" placeholder="Name" id="registerName" type="text" />
      <MDBInput wrapperClass="mb-4" placeholder="Username" id="registerUsername" type="text" />
      <MDBInput wrapperClass="mb-4" placeholder="Email" id="registerEmail" type="email" />
      <MDBInput wrapperClass="mb-4" placeholder="Password" id="registerPassword" type="password" />
      <MDBInput wrapperClass="mb-4" placeholder="Repeat password" id="registerRepeatPassword" type="password" />

      <div className="checkbox-container">
        <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="Remember me" />
      </div>

      <button type="submit" className="register-button">Sign up</button>
      
      <p className="text-center mt-3">
        Already have an account? <a href="/auth/login">Sign In</a>
      </p>
    </div>
  );
};

export default Register;
