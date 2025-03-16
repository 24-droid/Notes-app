import React, { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';

const Explore = () => {
  const { notes } = useNotes();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchChapter, setSearchChapter] = useState('');
  const [videoUrls, setVideoUrls] = useState({});

  // Create video URLs from videoFile.data if available.
  useEffect(() => {
    const newVideoUrls = { ...videoUrls };
    notes.forEach(note => {
      if (note.videoFile && note.videoFile.data && !newVideoUrls[note.id]) {
        newVideoUrls[note.id] = note.videoFile.data;
      }
    });
    setVideoUrls(newVideoUrls);
    // NOTE: We are not revoking URLs here to keep them persistent during the session.
  }, [notes]);

  // Group notes by class category.
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.classCategory]) {
      acc[note.classCategory] = [];
    }
    acc[note.classCategory].push(note);
    return acc;
  }, {});

  // Apply chapter search filter on each group.
  const filteredGroupedNotes = Object.entries(groupedNotes).reduce((acc, [category, notesArr]) => {
    const filtered = notesArr.filter(note =>
      note.chapter.toLowerCase().includes(searchChapter.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  // If a category is selected, restrict to that group only.
  const finalGroupedNotes = selectedCategory
    ? { [selectedCategory]: filteredGroupedNotes[selectedCategory] || [] }
    : filteredGroupedNotes;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Explore Notes & Videos
      </h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
          <option value="IIT JEE">IIT JEE</option>
          <option value="NEET">NEET</option>
        </select>

        <input
          type="text"
          placeholder="Search by Chapter"
          value={searchChapter}
          onChange={(e) => setSearchChapter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {Object.keys(finalGroupedNotes).length === 0 ? (
        <p className="text-center text-gray-600">No notes available.</p>
      ) : (
        Object.entries(finalGroupedNotes).map(([category, notesArr]) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notesArr.map(note => (
                <div
                  key={note.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
                >
                  <h4 className="text-xl font-bold mb-3 text-gray-900">{note.chapter}</h4>
                  <p className="text-gray-600 mb-2">{note.description}</p>
                  <span className="text-sm font-semibold text-gray-700">
                    Class: {note.classCategory} | Subject: {note.subject}
                  </span>
                  <div className="space-y-3 mt-2">
                    {((note.notesFiles && note.notesFiles.length > 0) || note.notesFile) && (
                      // Use an array to render download links, even if a single file is stored as notesFile
                      (note.notesFiles ? note.notesFiles : [note.notesFile]).map((file, index) => (
                        <a
                          key={index}
                          href={file.data}
                          download={file.name}
                          className="block text-sm text-blue-600 hover:underline"
                        >
                          Download {file.name}
                        </a>
                      ))
                    )}
                    {note.videoFile && videoUrls[note.id] && (
                      <video controls className="w-full rounded-lg border border-gray-200" key={note.id}>
                        <source src={videoUrls[note.id]} type={note.videoFile.type} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Explore;
