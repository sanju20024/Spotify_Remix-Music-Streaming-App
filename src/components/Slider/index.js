// ========================================
// IMPORTS
// ========================================

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

// ========================================
// HEADER COMPONENT
// ========================================

const Slider = props => {
  // ========================================
  // LOGOUT HANDLER
  // ========================================

  const onLogoutClick = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <nav className="nav-container">
      {/* LOGO + TITLE */}
      <div>
        <Link className="logo-container-title" to="/">
          <img
            src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766237268/Vector_yjnr7u.svg"
            alt="website logo"
            className="nav-icon"
          />
          <p className="title">Spotify Remix</p>
        </Link>
      </div>

      {/* DESKTOP LOGOUT BUTTON */}
      <button className="logout-button" type="button" onClick={onLogoutClick}>
        <img
          src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766292054/log-out-04_mrdhwf.svg"
          alt="log out"
        />
        <p>Logout</p>
      </button>
    </nav>
  )
}

export default withRouter(Slider)
