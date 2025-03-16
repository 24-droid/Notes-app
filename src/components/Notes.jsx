import React, { useState } from 'react';
import { useNotes } from '../context/NotesContext';

const Notes = () => {
  const { notes } = useNotes();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchChapter, setSearchChapter] = useState('');

  // Group notes by class/category
  const groupedNotes = notes.reduce((acc, note) => {
    const category = note.classCategory || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(note);
    return acc;
  }, {});

  // Apply chapter search filter on each group
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

  // Helper function to trigger file download
  const downloadFile = (fileData, fileName) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Notes</h1>

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
          <p className="text-gray-600 text-center">No notes available.</p>
        ) : (
          Object.entries(finalGroupedNotes).map(([category, notesArr]) => (
            <div key={category} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {notesArr.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{note.chapter}</h3>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Description:</span> {note.description}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">Subject:</span> {note.subject}
                    </p>
                    <div className="space-y-4">
                      {note.notesFiles &&
                        note.notesFiles.map((file, index) => (
                          <button
                            key={index}
                            onClick={() => downloadFile(file.data, file.name)}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Download {file.name}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
