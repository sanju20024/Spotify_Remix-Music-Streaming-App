/* =======================
   IMPORTS
======================= */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Slider from '../Slider'
import './index.css'

/* =======================
   COMPONENT
======================= */
class AlbumDetails extends Component {
  /* =======================
     STATE
  ======================= */
  state = {
    albumDetails: {},
    tracksList: [],
    activeSong: null,
    isPlaying: true,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
    error: false,
  }

  /* =======================
     AUDIO REF
  ======================= */
  audioRef = null

  /* =======================
     LIFECYCLE
  ======================= */
  componentDidMount() {
    this.getAlbumDetails()
  }

  /* =======================
     LOADING VIEW
  ======================= */
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

  /* =======================
     PLAY / PAUSE
  ======================= */
  togglePlayPause = () => {
    const {isPlaying} = this.state

    if (isPlaying) {
      this.audioRef.pause()
    } else {
      this.audioRef.play()
    }

    this.setState({isPlaying: !isPlaying})
  }

  /* =======================
     AUDIO TIME UPDATE
  ======================= */
  onTimeUpdate = () => {
    this.setState({
      currentTime: this.audioRef.currentTime,
      duration: this.audioRef.duration,
    })
  }

  /* =======================
     VOLUME CONTROL
  ======================= */
  onVolumeChange = event => {
    const volume = event.target.value
    this.audioRef.volume = volume
    this.setState({volume})
  }

  /* =======================
     SONG SELECT
  ======================= */
  onSongSelect = song => {
    this.setState({
      activeSong: song,
      isPlaying: true,
      currentTime: 0,
    })
  }

  /* =======================
     SEEK BAR
  ======================= */
  onSeek = event => {
    this.audioRef.currentTime = event.target.value
    this.setState({currentTime: event.target.value})
  }

  /* =======================
     API CALL
  ======================= */
  getAlbumDetails = async () => {
    this.setState({isLoading: true})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params

    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, option)
      const data = await response.json()

      if (response.ok === true) {
        const updatedAlbum = {
          image: data.images[0].url,
          name: data.name,
          artistName: data.artists[0].name,
        }

        this.setState({
          albumDetails: updatedAlbum,
          tracksList: data.tracks.items,
          isLoading: false,
          error: false,
        })
      } else {
        this.setState({isLoading: false, error: true})
      }
    } catch (e) {
      console.log(e)
      this.setState({isLoading: false, error: true})
    }
  }

  /* =======================
     BOTTOM PLAYER
  ======================= */
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

        {/* DESKTOP LEFT */}
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

        {/* DESKTOP CENTER */}
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

        {/* DESKTOP RIGHT */}
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

        {/* AUDIO */}
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

  /* =======================
     RETRY
  ======================= */
  onClickRetry = () => {
    this.getAlbumDetails()
  }

  /* =======================
     MAIN OUTPUT
  ======================= */
  renderOutPut = () => {
    const {albumDetails, tracksList, activeSong} = this.state
    const rating = 4
    const {history} = this.props

    return (
      <div className="playerdetails-bg-container">
        {/* SLIDER */}
        <div className="slide">
          <Slider />
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

          {/* ALBUM INFO */}
          <div className="playerdetails-upper-container">
            <img
              src={albumDetails.image}
              alt="album"
              className="playerdetails-thumnail-image"
            />
            <div className="playerdetails-upper-container-info">
              <p className="editorspick">New Releases</p>
              <h1 className="songName">{albumDetails.name}</h1>
              <p className="sp-artist">{albumDetails.artistName}</p>
            </div>
          </div>

          {/* TRACK TABLE */}
          <div className="tracks-container">
            <div className="table-header-album">
              <p>#</p>
              <p>Track</p>
              <p>Time</p>
              <p>Artist</p>
            </div>

            <ul className="table-body">
              {tracksList.map((x, index) => {
                const track = x
                const duration = `${Math.floor(
                  track.duration_ms / 60000,
                )}:${String(
                  Math.floor((track.duration_ms % 60000) / 1000),
                ).padStart(2, '0')}`

                return (
                  <li
                    key={track.id}
                    className="table-row-album"
                    onClick={() =>
                      this.onSongSelect({
                        previewUrl: track.preview_url,
                        name: track.name,
                        artist: track.artists[0].name,
                        thumbnail: albumDetails.image,
                      })
                    }
                  >
                    <p className="col-index">{index + 1}</p>
                    <p className="col-track">{track.name}</p>
                    <p className="col-time">{duration}</p>

                    <div className="popularity">
                      {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className={i <= rating ? 'active' : ''} />
                      ))}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* MOBILE VIEW */}
          <div className="mobile-track-view">
            <ul className="mobile-view-body">
              {tracksList.map(x => {
                const track = x
                const duration = `${Math.floor(
                  track.duration_ms / 60000,
                )}:${String(
                  Math.floor((track.duration_ms % 60000) / 1000),
                ).padStart(2, '0')}`

                return (
                  <li
                    key={track.id}
                    className="mobile-view-item"
                    onClick={() =>
                      this.onSongSelect({
                        previewUrl: track.preview_url,
                        name: track.name,
                        artist: track.artists[0].name,
                        thumbnail: albumDetails.image,
                      })
                    }
                  >
                    <div>
                      <p>{track.name}</p>
                      <p className="artist">
                        {track.artists.length > 0
                          ? track.artists[0].name
                          : 'Unknown'}
                      </p>
                    </div>
                    <p className="artist">{duration}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* PLAYER */}
          <div>{activeSong === null ? null : this.renderBottomPlayer()}</div>
        </div>
      </div>
    )
  }

  /* =======================
     ERROR VIEW
  ======================= */
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

  /* =======================
     FINAL RENDER
  ======================= */
  renderResult = () => {
    const {error} = this.state
    return <div>{error ? this.renderError() : this.renderOutPut()}</div>
  }

  render() {
    const {isLoading} = this.state
    return <div>{isLoading ? this.renderLoading() : this.renderResult()}</div>
  }
}

export default AlbumDetails
