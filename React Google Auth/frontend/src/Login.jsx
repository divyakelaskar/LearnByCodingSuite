import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/login', {
        params: {
          email,
          pass: btoa(password), // Encoding password to base64
          rememberMe: rememberMe.toString(),
        },
      });
      if (response.data.message === 'Success') {
        navigate('/success', { state: { name: response.data.result[0].Name } });
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      setMessage('Login failed: ' + error.response.data);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.get('http://localhost:5000/google-login', {
        params: {
          token: credentialResponse.credential,
        },
      });
      if (response.data.message === 'Success') {
        navigate('/success', { state: { name: response.data.result[0].Name } });
      } else {
        setMessage('Google Login failed');
      }
    } catch (error) {
      setMessage('Google Login failed: ' + error.response.data);
    }
  };

  const handleGoogleLoginFailure = () => {
    setMessage('Google Login failed');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{background:'white',color:'black'}}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{background:'white',color:'black'}}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{color:'white'}}
            />
            Remember Me
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            buttonText="Login with Google"
          />
        </GoogleOAuthProvider>
      </div>
      {message && <p style={{color:'red'}}>{message}</p>}
    </div>
  );
}

export default Login;
