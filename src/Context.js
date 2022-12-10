import { createContext, useContext } from 'react'

export const AuthContext = createContext(null) // for App.js

export const useAuth = () => { // for dece
    return useContext(AuthContext)
}