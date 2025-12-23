// ========================================
// IMPORTS
// ========================================
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'
import Slider from '../Slider'

// ========================================
// NOT FOUND COMPONENT
// ========================================

const NotFound = props => {
  const {history} = props

  return (
    <div className="playerdetails-bg-container">
      {/* HEADER */}
      <div className="head">
        <Header />
      </div>

      {/* SLIDER */}
      <div className="slide">
        <Slider />
      </div>

      <div className="playerdetails-container">
        {/* BACK BUTTON */}
        <button
          onClick={() => history.goBack()}
          className="back-button"
          type="button"
        >
          <img
            src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766311651/arrow_back_umsicn.svg"
            alt="back"
          />
          Back
        </button>

        {/* NOT FOUND MESSAGE */}
        <div className="not-found-info">
          <img
            src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766479236/Frame_153_eynvre.png"
            alt="page not found"
            className="not-found-image"
          />
          <h1 className="pageNotFound">Page Not Found</h1>
          <Link to="/">
            <button className="home-page-btn" type="button">
              Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
