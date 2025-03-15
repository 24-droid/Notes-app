import React from 'react'
import { useNotes } from '../context/NotesContext'

const Explore = () => {
  const { notes } = useNotes()

  // Group notes by class/category
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.classCategory]) {
      acc[note.classCategory] = []
    }
    acc[note.classCategory].push(note)
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Explore Notes & Videos</h2>
      {Object.keys(groupedNotes).length === 0 ? (
        <p className="text-center">No notes uploaded yet.</p>
      ) : (
        Object.keys(groupedNotes).map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupedNotes[category].map((note) => (
                <div key={note.id} className="bg-white p-4 rounded shadow">
                  <h4 className="text-xl font-bold mb-2">{note.chapter}</h4>
                  <p className="text-gray-600 mb-2">{note.description}</p>
                  <div className="space-y-2">
                    {note.notesFile && (
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-600 mr-2"
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
                          className="text-sm text-indigo-600 hover:underline"
                        >
                          Download Notes
                        </a>
                      </div>
                    )}
                    {note.videoFile && (
                      <div className="flex flex-col">
                        <div className="flex items-center mb-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-indigo-600 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M4 3a1 1 0 00-1 1v10a1 1 0 001 1h2v2a1 1 0 001.447.894l4-2.5A1 1 0 0012 15.5V14h2a1 1 0 001-1V4a1 1 0 00-1-1H4z" />
                          </svg>
                          <span className="text-sm text-gray-700">Video Preview</span>
                            </div>
                                <video controls className="w-full rounded border border-gray-300">
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
  )
}

export default Explore
