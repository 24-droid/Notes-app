import { useState } from 'react'

function Card() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 m-4 max-w-md mx-auto transform transition-all duration-300 hover:scale-105">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-600">Interactive Card</h2>
      <div className="flex flex-col items-center">
        <div className="text-6xl font-bold text-gray-800 mb-4">{count}</div>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mb-6"
        >
          Increment
        </button>
        <p className="text-gray-600 text-center">
          Click the button above to increase the count.
        </p>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500 italic">
          Tip: Edit <code className="bg-gray-100 rounded px-1">src/Card.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default Card

