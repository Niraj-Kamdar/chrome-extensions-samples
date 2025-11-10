import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // On mount -> load count from chrome.storage.local
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get('count', (result: { count?: number }) => {
        setCount(result.count || 0)
        setLoading(false)
      })
    } else {
      console.warn('Chrome storage is not available in this environment')
      setError('Chrome storage is not available in this environment')
      setLoading(false)
    }
  }, [])

  // On count change -> save count to chrome.storage.local
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ count })
        .catch((error) => {
          setError(error.message)
          console.error('Error saving count:', error)
        })
    }
  }, [count])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Boring Counter</h1>
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        )}
      </div>
      <div className="card">
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
