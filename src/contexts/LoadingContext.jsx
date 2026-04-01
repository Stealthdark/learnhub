import { createContext, useContext, useState, useEffect } from 'react'

const LoadingContext = createContext(false)

export function LoadingProvider({ children }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const inc = () => setCount(c => c + 1)
    const dec = () => setCount(c => Math.max(0, c - 1))
    window.addEventListener('lh:fetch:start', inc)
    window.addEventListener('lh:fetch:end', dec)
    return () => {
      window.removeEventListener('lh:fetch:start', inc)
      window.removeEventListener('lh:fetch:end', dec)
    }
  }, [])

  return (
    <LoadingContext.Provider value={count > 0}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useGlobalLoading() {
  return useContext(LoadingContext)
}
