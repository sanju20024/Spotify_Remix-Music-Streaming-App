# 🎧 Spotify Remix – Music Streaming Application

A Spotify-inspired music streaming web application built using **React JS** as part of the **NxtWave ReactJS Course**.  
This project demonstrates playlist browsing, album details, audio playback, routing, authentication, and responsive design.

---

## 🔗 Links

- **Live Application:** https://sanjaytunes.ccbp.tech/
- **Repository:** https://github.com/sanju20024/Spotify_Remix-Music-Streaming-App

---

## 📌 Overview

**Spotify Remix** is a front-end music streaming application inspired by Spotify.  
Users can log in, explore featured playlists, browse music by categories, view new releases, open playlists or albums, and play songs using an in-built audio player.

The project focuses on applying **React fundamentals**, **routing**, **API integration**, and **media handling** in a real-world scenario.

---

## ✨ Features

### 🔐 Authentication
- Login using username and password
- JWT-based authentication
- Protected routes
- Redirect handling for authenticated and unauthenticated users

### 🏠 Home Page
- Featured Playlists (Editor’s Picks)
- Categories (Genres & Moods)
- New Releases
- Sidebar navigation with logout

### 🎶 Music Browsing
- Playlist details page with list of tracks
- Category-wise playlists
- Album details page
- Display song name, artist name, and duration

### ▶️ Audio Player
- Play songs using preview URLs
- Supports play functionality for playlists, categories, and albums

### ❌ Error Handling
- Loader views while fetching data
- Failure views for API errors
- Not Found page for invalid routes

### 📱 Responsive Design
- Works on desktop, tablet, and mobile devices

---

## 🧰 Tech Stack

- **Frontend:** React JS
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Styling:** CSS
- **Authentication:** JWT
- **API Integration:** REST APIs
- **Media Handling:** HTML5 Audio

---

## 📂 Project Structure

<pre>
src/
├── components/
│   ├── Login/
│   ├── Home/
│   ├── PlaylistsDetails/
│   ├── CategoryPlaylistsDetails/
│   ├── AlbumDetails/
│   ├── Header/
│   ├── Sidebar/
│   ├── ProtectedRoute/
│   └── NotFound/
├── context/
│   └── PlayerContext.js
├── App.js
├── index.js
└── index.css
</pre>

---

## 🚀 Local Setup

### 1. Clone the repository
git clone git@github.com:sanju20024/Spotify_Remix-Music-Streaming-App.git

### 2. Navigate to the project directory
cd spotifyRemix

### 3. Install dependencies
npm install

### 4. Start the development server
npm start

The application will run at:http://localhost:3000

---

## 🔑 Test Login Credentials

username: raja
password: raja@2021

---

## 🧪 Learning Outcomes

- Implemented authentication and protected routes
- Integrated multiple REST APIs
- Built dynamic routes using React Router
- Implemented an audio player using HTML5 Audio
- Managed application state using Context API
- Improved component-based architecture
- Built a responsive user interface

---

## 👨‍💻 Author

**Sanjay Thadaka**

- GitHub: https://github.com/sanju20024
- Live App: https://sanjaytunes.ccbp.tech/

---

## 📄 License

This project is developed for **educational and learning purposes** as part of the **NxtWave ReactJS curriculum**.
