


import React, { useState, useContext } from 'react';
import '../Styles/login.css';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/images/login.png';
import usericon from '../assets/images/user.png';

import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
  
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        alert(result.message || "Login failed");
        dispatch({ type: 'LOGIN_FAILURE', payload: result.message });
        return;
      }
      localStorage.setItem("token", result.token);
      // 👇 This is the key fix:
      dispatch({ type: 'LOGIN_SUCCESS', payload: { ...result.data, token: result.token } });
      
      navigate('/');
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message });
      alert("Login error: " + err.message);
    }
  };
  

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login__container d-flex justify-content-between'>
              <div className='login__img'>
                <img src={loginImg} alt="login" />
              </div>

              <div className='login__form'>
                <div className='user'>
                  <img src={usericon} alt="user icon" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type='email'
                      placeholder='Email'
                      id='email'
                      onChange={handleChange}
                      required
                    />
                    <input
                      type='password'
                      placeholder='Password'
                      id='password'
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create an account</Link></p>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
