import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../context/NotesContext'

const Upload = () => {
  const { addNote } = useNotes()
  const navigate = useNavigate()
  const [chapter, setChapter] = useState('')
  const [classCategory, setClassCategory] = useState('')
  const [description, setDescription] = useState('')
  const [notesFile, setNotesFile] = useState(null)
  const [videoFile, setVideoFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create object URLs and store file details.
    const newNote = {
        id: Date.now(),
        chapter,
        classCategory,
        description,
        notesFile: notesFile
          ? { url: URL.createObjectURL(notesFile), name: notesFile.name, type: notesFile.type }
          : null,
        videoFile: videoFile
          ? { url: URL.createObjectURL(videoFile), name: videoFile.name, type: videoFile.type }
          : null,
      }
      
    addNote(newNote)
    navigate('/explore')
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Upload Notes & Videos</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Chapter */}
        <div>
          <label htmlFor="chapter" className="block mb-2 font-medium text-gray-700">
            Chapter
          </label>
          <input
            type="text"
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            placeholder="Enter chapter name"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        {/* Class/Category */}
        <div>
          <label htmlFor="classCategory" className="block mb-2 font-medium text-gray-700">
            Class / Category
          </label>
          <select
            id="classCategory"
            value={classCategory}
            onChange={(e) => setClassCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Class/Category</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
            <option value="IIT JEE">IIT JEE</option>
            <option value="NEET">NEET</option>
          </select>
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description"
            rows="4"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>
        </div>
        {/* Notes File Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Notes File</label>
          <div className="flex items-center">
            <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
              Choose File
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setNotesFile(e.target.files[0])}
                className="hidden"
                required
              />
            </label>
            <span className="ml-4 text-gray-700">
              {notesFile ? notesFile.name : 'No file chosen'}
            </span>
          </div>
        </div>
        {/* Video File Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Video File</label>
          <div className="flex items-center">
            <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
              Choose File
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            <span className="ml-4 text-gray-700">
              {videoFile ? videoFile.name : 'No file chosen'}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Upload
