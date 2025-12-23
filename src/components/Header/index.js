// ========================================
// IMPORTS
// ========================================

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'

import './index.css'

// ========================================
// HEADER COMPONENT
// ========================================

const Header = props => {
  // ========================================
  // LOGOUT HANDLER
  // ========================================

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const onLogoutClick = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  // ========================================
  // SCROLL TO SECTION HANDLER
  // ========================================

  const scrollToSection = sectionId => {
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
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

      {/* MOBILE MENU POPUP */}
      <div className="popup-container">
        {/* MENU TRIGGER BUTTON */}
        <button className="trigger-button" type="button" onClick={toggleMenu}>
          <img
            src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766293910/menu_aolrkk.svg"
            alt="menu"
          />
        </button>

        {/* MENU CONTENT */}
        {isMenuOpen && (
          <ul className="manu-item-container">
            {/* HOME */}
            <li
              onClick={() => {
                scrollToSection('home')
                closeMenu()
              }}
              className="manu-item-container"
            >
              Home
            </li>

            {/* PLAYLISTS */}
            <li
              onClick={() => {
                scrollToSection('playlists')
                closeMenu()
              }}
              className="manu-item-container"
            >
              Playlists
            </li>

            {/* CATEGORIES */}
            <li
              onClick={() => {
                scrollToSection('categories')
                closeMenu()
              }}
              className="manu-item-container"
            >
              Categories
            </li>

            {/* ALBUMS */}
            <li
              onClick={() => {
                scrollToSection('albums')
                closeMenu()
              }}
              className="manu-item-container"
            >
              Albums
            </li>

            {/* LOGOUT */}
            <li
              onClick={() => {
                closeMenu()
              }}
              className="manu-item-container"
            >
              <button
                className="menu-logout-button"
                onClick={onLogoutClick}
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default withRouter(Header)
