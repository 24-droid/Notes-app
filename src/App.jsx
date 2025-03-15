import { Suspense, lazy } from 'react'
import reactLogo from './assets/react.svg'

const Card = lazy(() => import('./Card'))

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-8">
      <header className="mb-12">
        <div className="flex items-center justify-center space-x-6 mb-6">
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
            <img src="/vite.svg" className="h-20 w-20" alt="Vite logo" />
          </a>
          <span className="text-5xl font-extrabold text-indigo-600">+</span>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-20 w-20" alt="React logo" />
          </a>
        </div>
        <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-4">Vite + React</h1>
        <p className="text-xl text-center text-indigo-600 mb-8">
          Empowering modern web development
        </p>
      </header>

      <main className="w-full max-w-3xl">
        <Suspense fallback={
          <div className="text-center text-indigo-600 animate-pulse">
            <svg className="inline w-8 h-8 mr-2 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading card component...
          </div>
        }>
          <Card />
        </Suspense>
      </main>

      <footer className="mt-16 text-center">
        <p className="text-sm text-indigo-600">
          Explore the power of Vite and React by clicking on their logos above
        </p>
      </footer>
    </div>
  )
}

export default App

