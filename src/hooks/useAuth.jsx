import { createContext, useContext, useState, useEffect } from 'react'
import { apiGetCurrentUser, logoutUser } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    apiGetCurrentUser()
      .then(u => { setUser(u); setAuthChecked(true) })
      .catch(() => setAuthChecked(true))
  }, [])

  function login(u) { setUser(u) }
  function logout() { logoutUser(); setUser(null) }
  function updateUser(u) { setUser(u) }

  return (
    <AuthContext.Provider value={{ user, setUser, authChecked, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
