import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NotesContext';

// Helper function to convert a file to Base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve({ name: file.name, type: file.type, data: reader.result });
    reader.onerror = (error) => reject(error);
  });
};

const Upload = () => {
  const { addNote } = useNotes();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState('');
  const [subject, setSubject] = useState('');
  const [classCategory, setClassCategory] = useState('');
  const [description, setDescription] = useState('');
  const [notesFiles, setNotesFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const notesData = notesFiles.length > 0 ? await Promise.all(notesFiles.map(fileToBase64)) : [];
      const newNote = {
        id: Date.now(),
        chapter,
        subject,
        classCategory,
        description,
        notesFiles: notesData,
        videoFile: videoFile
          ? {
              name: videoFile.name,
              type: videoFile.type,
              data: URL.createObjectURL(videoFile), // Temporary URL for video preview/download
            }
          : null,
      };
      addNote(newNote);
      navigate('/explore');
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300">
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
            Upload Notes & Videos
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Chapter Field */}
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

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block mb-3 font-semibold text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject name"
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Class/Category Field */}
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

            {/* Description Field */}
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

            {/* Notes Files Upload Field */} 
            <div>
              <label className="block mb-3 font-semibold text-gray-700">Notes Files</label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  Choose Files
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={(e) => setNotesFiles([...e.target.files])}
                    className="hidden"
                  />
                </label>
                <span className="ml-4 text-gray-700">
                  {notesFiles.length > 0 ? `${notesFiles.length} files selected` : 'No files chosen'}
                </span>
              </div>
            </div>

            {/* Video File Upload Field */} 
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
