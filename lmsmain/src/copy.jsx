import React from 'react';
import '../assets/css/Login/Login.css';
import logo from '../assets/img/Login_img/logo.png';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Datacontext } from './Context';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setLogedin } = useContext(Datacontext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        console.log('submit click');
        console.log('username', username);
        console.log('password', password);

        axios.post("http://127.0.0.1:5000/user/login", { username: username, passKey: password })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('login', response.data.success);
                localStorage.setItem('login id', response.data.userDetails.id);
                setLogedin(response.data.success);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="containerBox text-center">
            <div className="loginPage">
                <div className="loginBox">
                    <div className="LoginForm">
                        <img src={logo} width="60%" alt=""/>
                        <form>
                            <div className="row">
                                <input type="text" className="lms-login-input-box" id="username" placeholder="Email Id/Mobile No." onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="row">
                                <input type="password" className="lms-login-input-box" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="row">
                                <input type="button" className="lms-button form-control" value="Sign In" onClick={handleSubmit} />
                            </div>
                        </form>
                        <div className="row inputspace justify-content-center">
                            <span>Forgot <Link>Password?</Link></span>
                            <span>Do not have an account? <Link>Sign Up</Link></span>
                        </div>
                    </div>
                </div>
                <div className="loginPageImage"></div>
            </div>
        </div>
    );
}

export default Login;





























/* General Styles */
/*
.loginPage {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
}

input[type=text],input[type=password],input[type=button]{
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
}

input[type=button]{
  background-color: rgba(255, 68, 0, 0.727);
  color: white;
  
}

.loginBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  flex: 1 1 300px;
  margin: 20px;
}

.loginPageImage {
  background-color: gray;
  background-image: url('../../img/Login_img/cc1ca0955a.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1 1 300px;
  margin: 20px;
  border-radius: 10px;
}

/* Responsive Styles */
/*
@media screen and (max-width: 780px) {
  .loginPageImage {
      display: none;
  }

  .loginPage::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('../../img/Login_img/cc1ca0955a.jpeg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0.5;
      z-index: -1;
  }

  .loginBox {
      z-index: 1;
      background: rgba(255, 255, 255, 0.8);
  }

  input[type=text],input[type=password],input[type=button]{
    width: 90%;
    margin: auto;
    margin-bottom: 20px;
  }
}

*/