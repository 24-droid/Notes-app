import React from 'react';
import { useNotes } from '../context/NotesContext';

const Videos = () => {
  const { notes } = useNotes(); // Fetch notes from the context

  // Filter notes to only include those with video files
  const videos = notes.filter((note) => note.videoFile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Videos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length > 0 ? (
            videos.map((note) => (
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
                  {note.videoFile && (
                    <div className="relative aspect-w-16 aspect-h-9">
                      <video
                        controls
                        className="w-full h-full rounded-lg"
                        src={note.videoFile.data} // Use the video URL
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;