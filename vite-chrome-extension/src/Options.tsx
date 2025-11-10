import { StrictMode, useCallback, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './options.css'

function Options() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get('count', (result: { count?: number }) => {
        setCount(result.count || 0)
      })
    }
  }, [])

  // editCount
  // useCallback
  const editCount = useCallback((newCount: number) => {
    setCount(newCount)
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ count: newCount })
    }
  }, [])

  // resetCount
  const resetCount = useCallback(() => {
    setCount(0)
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ count: 0 })
    }
  }, [])

  return (
    <div className="options-container">
      <div className="card">
        <h1>Options Page</h1>
        <p>Count: {count}</p>
        <input type="number" value={count} onChange={(e) => editCount(Number(e.target.value))} />
        <button onClick={resetCount}>Reset</button>
      </div>
    </div>
  )
}

createRoot(document.getElementById('options-root')!).render(
  <StrictMode>
    <Options />
  </StrictMode>,
)
