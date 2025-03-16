import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';

const Upload = () => {
  const { addNote } = useNotes();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState('');
  const [classCategory, setClassCategory] = useState('');
  const [description, setDescription] = useState('');
  const [notesFile, setNotesFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert files to Base64 for storage
    const reader = new FileReader();
    if (notesFile) {
      reader.readAsDataURL(notesFile);
      reader.onload = () => {
        const notesFileData = reader.result;

        const newNote = {
          id: Date.now(),
          chapter,
          classCategory,
          description,
          notesFile: {
            name: notesFile.name,
            type: notesFile.type,
            data: notesFileData, // Store file data as Base64
          },
          videoFile: videoFile
            ? {
                name: videoFile.name,
                type: videoFile.type,
                data: URL.createObjectURL(videoFile), // Temporary URL for videos
              }
            : null,
        };

        addNote(newNote);
        navigate('/explore');
      };
    } else {
      const newNote = {
        id: Date.now(),
        chapter,
        classCategory,
        description,
        notesFile: null,
        videoFile: videoFile
          ? {
              name: videoFile.name,
              type: videoFile.type,
              data: URL.createObjectURL(videoFile), // Temporary URL for videos
            }
          : null,
      };

      addNote(newNote);
      navigate('/explore');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Upload Notes & Videos
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Chapter */}
            <div>
              <label htmlFor="chapter" className="block mb-3 font-semibold text-gray-700">
                Chapter
              </label>
              <input
                type="text"
                id="chapter"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="Enter chapter name"
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Class/Category */}
            <div>
              <label htmlFor="classCategory" className="block mb-3 font-semibold text-gray-700">
                Class / Category
              </label>
              <select
                id="classCategory"
                value={classCategory}
                onChange={(e) => setClassCategory(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
              <label htmlFor="description" className="block mb-3 font-semibold text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a brief description"
                rows="4"
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
              ></textarea>
            </div>

            {/* Notes File Upload */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700">Notes File</label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  Choose File
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setNotesFile(e.target.files[0])}
                    className="hidden"
                  />
                </label>
                <span className="ml-4 text-gray-700">
                  {notesFile ? notesFile.name : 'No file chosen'}
                </span>
              </div>
            </div>

            {/* Video File Upload */}
            <div>
              <label className="block mb-3 font-semibold text-gray-700">Video File</label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;