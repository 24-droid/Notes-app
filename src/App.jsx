import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Explore from './components/Explore'
import Upload from './components/Upload'
import Notes from './components/Notes'

function Navbar() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-indigo-600">
          DSVICTORY
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/explore" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Explore
              </a>
            </li>
            <li>
              <a href="/upload" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Upload
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}



function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/notes" element={<Notes />} /> 
        </Routes>
    </div>
  )
}

export default App