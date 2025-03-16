import React from 'react';
import { useNotes } from '../context/NotesContext';

const Notes = () => {
  const { notes } = useNotes();

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{note.chapter}</h2>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Class/Category:</span> {note.classCategory}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Description:</span> {note.description}
                </p>
                <div className="space-y-4">
                  {note.notesFile && (
                    <button
                      onClick={() => downloadFile(note.notesFile.data, note.notesFile.name)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Download Notes ({note.notesFile.name})
                    </button>
                  )}
                  {note.videoFile && (
                    <a
                      href={note.videoFile.data}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-purple-600 text-white px-4 py-2 rounded-lg text-center hover:bg-purple-700 transition-colors"
                    >
                      Watch Video ({note.videoFile.name})
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;