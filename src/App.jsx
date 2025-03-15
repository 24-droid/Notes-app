import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Explore from './components/Explore'
import Upload from './components/Upload'

function Navbar() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-indigo-600">
          NotesApp
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

function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-6 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} NotesApp. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-7xl mx-auto p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
