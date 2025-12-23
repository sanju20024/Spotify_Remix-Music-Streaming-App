import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './ProtectedRoute'
import PlaylistsDetails from './components/PlaylistsDetails'
import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails'
import AlbumDetails from './components/AlbumDetails'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/playlist/:id" component={PlaylistsDetails} />
      <ProtectedRoute
        exact
        path="/category/:id/playlists"
        component={CategoryPlaylistsDetails}
      />
      <ProtectedRoute exact path="/album/:id" component={AlbumDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
