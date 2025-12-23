// ========================================
// IMPORTS
// ========================================

import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

// ========================================
// LOGIN COMPONENT
// ========================================

class Login extends Component {
  // ========================================
  // STATE
  // ========================================

  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    isLoading: false,
    showPassword: false,
  }

  // ========================================
  // INPUT HANDLERS
  // ========================================

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  // ========================================
  // FORM SUBMISSION
  // ========================================

  onSubmitForm = async event => {
    event.preventDefault()
    this.setState({isLoading: true})

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        isLoading: false,
        showError: false,
        errorMsg: '',
      })

      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
        path: '/',
      })

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        showError: true,
        errorMsg: data.error_msg,
        isLoading: false,
      })
    }
  }

  // ========================================
  // LOGIN FORM UI
  // ========================================

  renderLoginForm = () => {
    const {showError, errorMsg, username, password, showPassword} = this.state

    return (
      <div className="login-bg-container">
        <form onSubmit={this.onSubmitForm} className="login-form-container">
          {/* LOGO SECTION */}
          <div className="login-logo-container">
            <img
              src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766237268/Vector_yjnr7u.svg"
              alt="login website logo"
            />
            <h1 className="Heading">Spotify Remix</h1>
          </div>

          {/* FORM FIELDS */}
          <div className="login-form-details-container">
            {/* USERNAME */}
            <label className="login-labels-inputs" htmlFor="username">
              USERNAME
              <input
                value={username}
                className="login-inputs"
                type="text"
                placeholder="Enter Username"
                id="username"
                onChange={this.onUsernameChange}
              />
            </label>

            {/* PASSWORD */}
            <label className="login-labels-inputs" htmlFor="password">
              PASSWORD
              <input
                value={password}
                className="login-inputs"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                id="password"
                onChange={this.onPasswordChange}
              />
            </label>

            {/* SHOW PASSWORD */}
            <div className="show-password-container">
              <input
                type="checkbox"
                id="showPassword"
                onClick={this.onShowPassword}
                checked={showPassword}
                onChange={this.onShowPassword}
              />
              <label className="showPassword-label" htmlFor="showPassword">
                Show Password
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="login-button" type="submit">
              Login
            </button>

            {/* ERROR MESSAGE */}
            {showError && <p className="errorMsg">* {errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }

  // ========================================
  // LOADING UI
  // ========================================

  renderLoading = () => (
    <div className="loading-container">
      <div>
        <img
          src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766237268/Vector_yjnr7u.svg"
          alt="loader"
        />
        <h1 className="loading-text">Loading...</h1>
      </div>
    </div>
  )

  // ========================================
  // RENDER
  // ========================================

  render() {
    const {isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>{isLoading ? this.renderLoading() : this.renderLoginForm()}</div>
    )
  }
}

export default Login
