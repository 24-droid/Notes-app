import React from 'react';
import { useNotes } from '../context/NotesContext';

const Explore = () => {
  const { notes } = useNotes();

  // Group notes by class/category
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.classCategory]) {
      acc[note.classCategory] = [];
    }
    acc[note.classCategory].push(note);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Explore Notes & Videos
      </h2>
      {Object.keys(groupedNotes).length === 0 ? (
        <p className="text-center text-gray-600">No notes uploaded yet.</p>
      ) : (
        Object.keys(groupedNotes).map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-600 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedNotes[category].map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
                >
                  <h4 className="text-xl font-bold mb-3 text-gray-900">{note.chapter}</h4>
                  <p className="text-gray-600 mb-4">{note.description}</p>
                  <div className="space-y-3">
                    {note.notesFile && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 2a2 2 0 00-2 2v1H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H8z" />
                        </svg>
                        <a
                          href={note.notesFile.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={note.notesFile.name}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Download Notes
                        </a>
                      </div>
                    )}
                    {note.videoFile && (
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M4 3a1 1 0 00-1 1v10a1 1 0 001 1h2v2a1 1 0 001.447.894l4-2.5A1 1 0 0012 15.5V14h2a1 1 0 001-1V4a1 1 0 00-1-1H4z" />
                          </svg>
                          <span className="text-sm text-gray-700">Video Preview</span>
                        </div>
                        <video
                          controls
                          className="w-full rounded-lg border border-gray-200"
                        >
                          <source src={note.videoFile.url} type={note.videoFile.type} />
                          Your browser does not support the video tag.
                        </video>
                      </div>
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