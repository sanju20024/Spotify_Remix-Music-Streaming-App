// ================================
// IMPORTS
// ================================

import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'
import Slider from '../Slider'

// ================================
// PLAYLIST DETAILS COMPONENT
// ================================

class PlaylistsDetails extends Component {
  // ================================
  // STATE
  // ================================

  state = {
    playlistDetails: {},
    songsList: [],
    activeSong: null,
    isPlaying: true,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isLoading: false,
    error: false,
  }

  // ================================
  // AUDIO REF
  // ================================

  audioRef = null

  // ================================
  // LIFECYCLE
  // ================================

  componentDidMount() {
    this.getPlaylistDetails()
  }

  // ================================
  // LOADING UI
  // ================================

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

  // ================================
  // PLAY / PAUSE TOGGLE
  // ================================

  togglePlayPause = () => {
    const {isPlaying} = this.state

    if (isPlaying) {
      this.audioRef.pause()
    } else {
      this.audioRef.play()
    }

    this.setState({isPlaying: !isPlaying})
  }

  // ================================
  // AUDIO TIME UPDATE
  // ================================

  onTimeUpdate = () => {
    this.setState({
      currentTime: this.audioRef.currentTime,
      duration: this.audioRef.duration,
    })
  }

  // ================================
  // SEEK AUDIO
  // ================================

  onSeek = event => {
    this.audioRef.currentTime = event.target.value
    this.setState({currentTime: event.target.value})
  }

  // ================================
  // VOLUME CHANGE
  // ================================

  onVolumeChange = event => {
    const volume = event.target.value
    this.audioRef.volume = volume
    this.setState({volume})
  }

  // ================================
  // FETCH PLAYLIST DETAILS
  // ================================

  getPlaylistDetails = async () => {
    this.setState({isLoading: true})

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })

      const data = await response.json()

      if (response.ok === true) {
        const updatedData = {
          name: data.name,
          description: data.description,
          image: data.images[0].url,
        }

        this.setState({
          playlistDetails: updatedData,
          songsList: data.tracks.items,
          isLoading: false,
        })
      } else {
        this.setState({isLoading: false, error: true})
      }
    } catch (e) {
      console.log(e)
      this.setState({isLoading: false, error: true})
    }
  }

  // ================================
  // SELECT SONG
  // ================================

  onSongSelect = song => {
    this.setState({
      activeSong: song,
      isPlaying: true,
      currentTime: 0,
    })
  }

  // ================================
  // BOTTOM PLAYER
  // ================================

  renderBottomPlayer = () => {
    const {activeSong, isPlaying, currentTime, duration, volume} = this.state
    if (!activeSong) return null

    const volumePercentage = volume * 100
    const volumeStyle = {
      background: `linear-gradient(to right, #1db954 ${volumePercentage}%, #535353 ${volumePercentage}%)`,
    }

    const playedPercentage = duration ? (currentTime / duration) * 100 : 0

    const sliderStyle = {
      background: `linear-gradient(to right, #1db954 ${playedPercentage}%, #535353 ${playedPercentage}%)`,
    }

    const formatTime = time => {
      if (!time) return '0:00'
      const m = Math.floor(time / 60)
      const s = Math.floor(time % 60)
      return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    return (
      <div className="spotify-player">
        {/* MOBILE TIMELINE */}
        <input
          type="range"
          min="0"
          className="mobile-slider-music"
          style={sliderStyle}
          max={duration || 0}
          value={currentTime}
          onChange={this.onSeek}
        />

        {/* MOBILE PLAYER */}
        <div className="movie-player">
          <div className="sp-left">
            <img
              src={activeSong.thumbnail}
              alt="song thumbnail"
              className="sp-thumb"
            />
            <div>
              <p className="sp-title">{activeSong.name}</p>
              <p className="sp-artist">{activeSong.artist}</p>
            </div>
          </div>

          <button
            type="button"
            className="sp-play"
            onClick={this.togglePlayPause}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
        </div>

        {/* LEFT */}
        <div className="sp-left">
          <img
            src={activeSong.thumbnail}
            alt="song thumbnail"
            className="sp-thumb"
          />
          <div>
            <p className="sp-title">{activeSong.name}</p>
            <p className="sp-artist">{activeSong.artist}</p>
          </div>
        </div>

        {/* CENTER */}
        <div className="sp-center">
          <button
            type="button"
            className="sp-play"
            onClick={this.togglePlayPause}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          <div className="sp-timeline">
            <p className="timer">
              <span>{formatTime(currentTime)}</span>/
              <span>{formatTime(duration)}</span>
            </p>

            <input
              type="range"
              min="0"
              style={sliderStyle}
              max={duration || 0}
              value={currentTime}
              onChange={this.onSeek}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="sp-right">
          <span>
            <img
              src="https://res.cloudinary.com/dvf7rhe2l/image/upload/v1766335958/sound_mzsfrj.svg"
              alt="volume"
            />
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            style={volumeStyle}
            value={volume}
            onChange={this.onVolumeChange}
          />
        </div>

        {/* AUDIO ELEMENT */}
        <audio
          ref={ref => {
            this.audioRef = ref
          }}
          src={activeSong.previewUrl}
          autoPlay
          onTimeUpdate={this.onTimeUpdate}
          onLoadedMetadata={this.onTimeUpdate}
        >
          <track kind="captions" />
        </audio>
      </div>
    )
  }

  // ================================
  // MAIN CONTENT
  // ================================

  renderOutPut = () => {
    const {playlistDetails, songsList, activeSong} = this.state
    console.log(playlistDetails)
    const {history} = this.props
    const formatTimeAgo = dateString => {
      const now = new Date()
      const past = new Date(dateString)
      const diffInSeconds = Math.floor((now - past) / 1000)

      if (diffInSeconds < 60) {
        return 'Just now'
      }

      const minutes = Math.floor(diffInSeconds / 60)
      if (minutes < 60) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
      }

      const hours = Math.floor(minutes / 60)
      if (hours < 24) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
      }

      const days = Math.floor(hours / 24)
      if (days < 7) {
        return `${days} day${days > 1 ? 's' : ''} ago`
      }

      const weeks = Math.floor(days / 7)
      if (weeks < 4) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`
      }

      const months = Math.floor(days / 30)
      if (months < 12) {
        return `${months} month${months > 1 ? 's' : ''} ago`
      }

      const years = Math.floor(days / 365)
      return `${years} year${years > 1 ? 's' : ''} ago`
    }

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

          {/* PLAYLIST INFO */}
          <div className="playerdetails-upper-container">
            <img
              src={
                activeSong === null
                  ? playlistDetails.image
                  : activeSong.thumbnail
              }
              alt="featured playlist"
              className="playerdetails-thumnail-image"
            />

            <div className="playerdetails-upper-container-info">
              <p className="editorspick">Editors Picks</p>

              <h1 className="songName">{playlistDetails.name}</h1>
              <p>{playlistDetails.description}</p>
            </div>
          </div>

          {/* SONG LIST */}
          <div className="tracks-container">
            <div className="table-header">
              <p>Track</p>
              <p>Album</p>
              <p>Time</p>
              <p>Artist</p>
              <p>Added</p>
            </div>

            <ul className="table-body">
              {songsList.map((each, index) => {
                const {track, added_at: addedAt} = each

                const duration = `${Math.floor(
                  track.duration_ms / 60000,
                )}:${String(
                  Math.floor((track.duration_ms % 60000) / 1000),
                ).padStart(2, '0')}`

                return (
                  <li
                    key={track.id}
                    onClick={() =>
                      this.onSongSelect({
                        previewUrl: track.preview_url,
                        name: track.name,
                        artist: track.artists[0].name,
                        thumbnail: track.album.images[0]
                          ? track.album.images[0].url
                          : track.album.images[2].url,
                      })
                    }
                    className="table-row"
                  >
                    <p className="col-index">{index + 1}</p>
                    <p className="col-track">{track.name}</p>
                    <p className="col-album">{track.album.name}</p>
                    <p className="col-time">{duration}</p>
                    <p className="col-artist">
                      {track.artists.length > 0
                        ? track.artists[0].name
                        : 'Unknown'}
                    </p>
                    <p className="col-added">{formatTimeAgo(addedAt)}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* BOTTOM PLAYER */}
          <div>{activeSong === null ? null : this.renderBottomPlayer()}</div>
        </div>
      </div>
    )
  }

  // ================================
  // ERROR HANDLING
  // ================================

  onClickRetry = () => {
    this.getPlaylistDetails()
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
              alt="failure view"
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

  renderResult = () => {
    const {error} = this.state
    return <div>{error ? this.renderError() : this.renderOutPut()}</div>
  }

  // ================================
  // RENDER
  // ================================

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.renderLoading() : this.renderResult()}</div>
  }
}

export default PlaylistsDetails
