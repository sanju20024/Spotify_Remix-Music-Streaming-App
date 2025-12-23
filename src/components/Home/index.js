// ========================================
// IMPORTS
// ========================================

import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Slider from '../Slider'

import './index.css'

// ========================================
// HOME COMPONENT
// ========================================

class Home extends Component {
  // ========================================
  // STATE
  // ========================================

  state = {
    featuredPlayList: [],
    featuredIsLoading: false,
    featuredError: false,

    categoriesPlayList: [],
    categoryIsLoading: false,
    categoryError: false,

    newReleasesPlayList: [],
    newReleaseIsLoading: false,
    newReleaseError: false,
  }

  // ========================================
  // LIFECYCLE
  // ========================================

  componentDidMount() {
    this.getFeaturedPlayList()
    this.getCategoriesPlayList()
    this.getNewReleasesPlayList()
  }

  // ========================================
  // FEATURED PLAYLIST API
  // ========================================

  getFeaturedPlayList = async () => {
    this.setState({featuredIsLoading: true})

    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok === true) {
        const playlistData = data.playlists.items

        const updatedPlaylists = playlistData.map(each => ({
          id: each.id,
          name: each.name,
          imageUrl: each.images[0].url,
          tracksCount: each.tracks.total,
        }))

        this.setState({
          featuredPlayList: updatedPlaylists,
          featuredIsLoading: false,
          featuredError: false,
        })
      } else {
        this.setState({featuredError: true, featuredIsLoading: false})
      }
    } catch (e) {
      console.log(e)
      this.setState({featuredError: true, featuredIsLoading: false})
    }
  }

  // ========================================
  // CATEGORIES API
  // ========================================

  getCategoriesPlayList = async () => {
    this.setState({categoryIsLoading: true})

    const url = 'https://apis2.ccbp.in/spotify-clone/categories'

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok === true) {
        const playlistData = data.categories.items

        const updatedPlaylists = playlistData.map(each => ({
          id: each.id,
          name: each.name,
          icon: each.icons[0].url,
        }))

        this.setState({
          categoriesPlayList: updatedPlaylists,
          categoryIsLoading: false,
          categoryError: false,
        })
      } else {
        this.setState({categoryIsLoading: false, categoryError: true})
      }
    } catch (e) {
      console.log(e)
      this.setState({categoryIsLoading: false, categoryError: true})
    }
  }

  // ========================================
  // NEW RELEASES API
  // ========================================

  getNewReleasesPlayList = async () => {
    this.setState({newReleaseIsLoading: true})

    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'

    try {
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok === true) {
        const playlistData = data.albums.items

        const updatedPlaylists = playlistData.map(each => ({
          id: each.id,
          name: each.name,
          image: each.images[0].url,
        }))

        this.setState({
          newReleasesPlayList: updatedPlaylists,
          newReleaseIsLoading: false,
          newReleaseError: false,
        })
      } else {
        this.setState({newReleaseIsLoading: false, newReleaseError: true})
      }
    } catch (e) {
      console.log(e)
      this.setState({newReleaseIsLoading: false, newReleaseError: true})
    }
  }

  // ========================================
  // LOADING UI
  // ========================================

  renderLoading = () => (
    <div data-testid="loader" className="loading-container">
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
  // RETRY HANDLERS
  // ========================================

  onClickFearuteRetry = () => {
    this.getFeaturedPlayList()
  }

  onClickCategoryRetry = () => {
    this.getCategoriesPlayList()
  }

  onNewReleaseClickRetry = () => {
    this.getNewReleasesPlayList()
  }

  // ========================================
  // ERROR UI
  // ========================================

  renderFeatureError = () => (
    <div className="feature-error-bg-container">
      <div className="error-info-bg">
        <img
          src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766417156/alert-triangle_nlsc6a.svg"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          onClick={this.onClickFearuteRetry}
          className="try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderCategoryError = () => (
    <div className="feature-error-bg-container">
      <div className="error-info-bg">
        <img
          src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766417156/alert-triangle_nlsc6a.svg"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          onClick={this.onClickCategoryRetry}
          className="try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderNewReleaseError = () => (
    <div className="feature-error-bg-container">
      <div className="error-info-bg">
        <img
          src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766417156/alert-triangle_nlsc6a.svg"
          alt="failure view"
        />
        <p>Something went wrong. Please try again</p>
        <button
          onClick={this.onNewReleaseClickRetry}
          className="try-again-btn"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  // ========================================
  // FEATURED PLAYLIST UI
  // ========================================

  renderFeatureOutPut = () => {
    const {featuredPlayList} = this.state

    return (
      <div className="featured-playlist-bg-container">
        <ul className="featured-playlist-container">
          {featuredPlayList.map(x => (
            <li className="featured-playlist-items" key={x.id}>
              <Link to={`/playlist/${x.id}`}>
                <img
                  src={x.imageUrl}
                  alt="featured playlist"
                  className="featured-playlist-images"
                />
                <p className="featured-playlist-name">{x.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // ========================================
  // CATEGORY UI
  // ========================================

  renderCategoryOutPut = () => {
    const {categoriesPlayList} = this.state

    return (
      <div className="featured-playlist-bg-container">
        <ul className="featured-playlist-container">
          {categoriesPlayList.map(x => (
            <li className="featured-playlist-items" key={x.id}>
              <Link
                to={{
                  pathname: `/category/${x.id}/playlists`,
                  state: {categoryName: x.name},
                }}
              >
                <img
                  src={x.icon}
                  alt="category"
                  className="featured-playlist-images"
                />
                <p className="featured-playlist-name">{x.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // ========================================
  // NEW RELEASE UI
  // ========================================

  renderNewReleaseOutPut = () => {
    const {newReleasesPlayList} = this.state

    return (
      <div className="featured-playlist-bg-container">
        <ul className="featured-playlist-container">
          {newReleasesPlayList.map(x => (
            <li className="featured-playlist-items" key={x.id}>
              <Link to={`/album/${x.id}`}>
                <img
                  src={x.image}
                  alt="new release album"
                  className="featured-playlist-images"
                />
                <p className="featured-playlist-name">{x.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // ========================================
  // RESULT SWITCHES
  // ========================================

  renderFeatureResult = () => {
    const {featuredError} = this.state
    return (
      <div>
        {featuredError ? this.renderFeatureError() : this.renderFeatureOutPut()}
      </div>
    )
  }

  renderCategoryResult = () => {
    const {categoryError} = this.state
    return (
      <div>
        {categoryError
          ? this.renderCategoryError()
          : this.renderCategoryOutPut()}
      </div>
    )
  }

  renderNewReleaseResult = () => {
    const {newReleaseError} = this.state
    return (
      <div>
        {newReleaseError
          ? this.renderNewReleaseError()
          : this.renderNewReleaseOutPut()}
      </div>
    )
  }

  // ========================================
  // FINAL RESULT WITH LOADER
  // ========================================

  renderFinalFeatureResult = () => {
    const {featuredIsLoading} = this.state
    return (
      <div>
        {featuredIsLoading ? this.renderLoading() : this.renderFeatureResult()}
      </div>
    )
  }

  rendnderFinalCategoryResult = () => {
    const {categoryIsLoading} = this.state
    return (
      <div>
        {categoryIsLoading ? this.renderLoading() : this.renderCategoryResult()}
      </div>
    )
  }

  renderFinalNewReleaseResult = () => {
    const {newReleaseIsLoading} = this.state
    return (
      <div>
        {newReleaseIsLoading
          ? this.renderLoading()
          : this.renderNewReleaseResult()}
      </div>
    )
  }

  // ========================================
  // RENDER
  // ========================================

  render() {
    return (
      <div id="home" className="home-bg-container">
        {/* HEADER */}
        <div className="head">
          <Header />
        </div>

        {/* SLIDER */}
        <div className="slide">
          <Slider />
        </div>

        {/* PAGE CONTENT */}
        <div className="home-container">
          {/* FEATURED PLAYLISTS */}
          <div id="playlists" className="play-lists-container">
            <h1 className="playlist-heading">Editors Picks</h1>
            <div>{this.renderFinalFeatureResult()}</div>
          </div>

          {/* CATEGORIES */}
          <div id="categories" className="play-lists-container">
            <h1 className="playlist-heading">Genres & Moods</h1>
            <div>{this.rendnderFinalCategoryResult()}</div>
          </div>

          {/* NEW RELEASES */}
          <div id="albums" className="play-lists-container">
            <h1 className="playlist-heading">New Releases</h1>
            <div>{this.renderFinalNewReleaseResult()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
