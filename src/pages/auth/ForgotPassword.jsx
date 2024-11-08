import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import './ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <p className="forgot-password-instructions">
        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
      </p>
      
      <MDBInput wrapperClass="mb-4" placeholder="Email address" id="email" type="email" />

      <button type="submit" className="forgot-password-button">Send Reset Link</button>

      <p className="text-center mt-3">
        Remembered your password? <a href="/auth/login">Sign In</a>
      </p>
    </div>
  );
};

export default ForgotPassword;
