import React from 'react'

const Upload = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Upload</h2>
      <p>Upload form for notes and videos.</p>
      <form className="mt-4">
        {/* Add your form fields here */}
        <input
          type="file"
          className="border p-2 mb-2"
          accept=".pdf,.doc,.mp4"
          multiple
        />
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Upload
