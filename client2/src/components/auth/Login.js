import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './Style.css';

const Login = ({ login, isAuthenticated }) => {
  // const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //   redirect id f loged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    // console.log('success')
  };

  return (
    <Fragment>
      <div className='cont'>
        <div className='container2'>
          <div className='card1'>
            <form onSubmit={(e) => onSubmit(e)}>
              <img src='https://freepngimg.com/thumb/logo/70011-instagram-script-typeface-myfonts-user-logo-font.png'className='iconinsta' ></img>
              <p className='lead'>
                <i className='fas fa-user' /> Sign into Account
              </p>
              <div>
                <input
                  type='text'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <input type='submit' className='btn btn-primary' value='Login' />
              <br></br><br></br>
              <p className='my-1'>
  Don't have an account? <Link to='/register'>{' '}Sign Up</Link>
      </p>
            </form>
            
            {/* <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
// export default Login;
