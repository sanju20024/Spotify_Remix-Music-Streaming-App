// ========================================
// IMPORTS
// ========================================

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'
import Slider from '../Slider'

// ========================================
// CATEGORY PLAYLIST DETAILS COMPONENT
// ========================================

class CategoryPlaylistsDetails extends Component {
  // ========================================
  // STATE
  // ========================================

  state = {
    playlists: [],
    error: false,
    isLoading: false,
  }

  // ========================================
  // LIFECYCLE METHOD
  // ========================================

  componentDidMount() {
    this.getCategoryPlayList()
  }

  // ========================================
  // FETCH CATEGORY PLAYLISTS
  // ========================================

  getCategoryPlayList = async () => {
    this.setState({isLoading: true})

    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      const data = await response.json()

      if (response.ok === true) {
        const playlists = data.playlists.items

        const updatedPlaylists = playlists
          .filter(each => each !== null)
          .map(each => ({
            id: each.id,
            name: each.name,
            tracksCount: each.tracks ? each.tracks.total : 0,
            imageUrl:
              each.images && each.images.length > 0 ? each.images[0].url : '',
          }))

        this.setState({
          playlists: updatedPlaylists,
          isLoading: false,
        })
      } else {
        this.setState({error: true, isLoading: false})
      }
    } catch (e) {
      console.log(e)
      this.setState({error: true, isLoading: false})
    }
  }

  // ========================================
  // SUCCESS UI
  // ========================================

  renderOutPut = () => {
    const {playlists} = this.state
    const {history, location} = this.props

    const categoryName = location.state
      ? location.state.categoryName
      : 'Category'

    return (
      <div className="playerdetails-bg-container">
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

          {/* CATEGORY TITLE */}
          <h1 className="category-heading">{categoryName}</h1>

          {/* PLAYLISTS */}
          <ul className="featured-playlist-container">
            {playlists.map(each => (
              <li key={each.id} className="featured-playlist-items-category">
                <Link to={`/playlist/${each.id}`} className="link-album">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="featured-playlist-images"
                  />

                  <div className="category-info">
                    <p className="featured-playlist-name-category">
                      {each.name}
                    </p>
                    <p className="tracks">{each.tracksCount} Tracks</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
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
  // ERROR HANDLING
  // ========================================

  onClickRetry = () => {
    this.getCategoryPlayList()
  }

  renderError = () => {
    const {history} = this.props

    return (
      <div className="playerdetails-bg-container">
        <div className="header">
          <Header />
        </div>

        <div className="playerdetails-container">
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

          <div className="error-info-bg-full">
            <img
              src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766417156/alert-triangle_nlsc6a.svg"
              alt="alert"
            />
            <p className="error-msg">Something went wrong. Please try again</p>
            <button
              onClick={this.onClickRetry}
              className="try-again-btn"
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ========================================
  // RESULT SWITCH
  // ========================================

  renderResult = () => {
    const {error} = this.state
    return <div>{error ? this.renderError() : this.renderOutPut()}</div>
  }

  // ========================================
  // RENDER
  // ========================================

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.renderLoading() : this.renderResult()}</div>
  }
}

export default CategoryPlaylistsDetails
