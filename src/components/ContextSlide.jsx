import React, { useState, createContext } from 'react'

export const slideNo = createContext(null)

export default function ContextSlide({children}) {
    const [slide, setSlide] = useState(0);
  return (
    <slideNo.Provider value={{slide, setSlide}} >
        {children}
    </slideNo.Provider>
  )
}
