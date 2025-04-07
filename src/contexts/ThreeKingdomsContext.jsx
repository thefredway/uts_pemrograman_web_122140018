import { createContext, useContext, useEffect, useState } from 'react'
import useThreeKingdomsData from '../hooks/useThreeKingdomsData'

const ThreeKingdomsContext = createContext()

export function ThreeKingdomsProvider({ children }) {
  const [characters, setCharacters] = useState([])
  const [battles, setBattles] = useState([])
  
  const { data: charactersData, loading: charsLoading } = useThreeKingdomsData('characters')
  const { data: battlesData, loading: battlesLoading } = useThreeKingdomsData('battles')

  useEffect(() => {
    if (!charsLoading && charactersData) {
      setCharacters(charactersData)
    }
  }, [charsLoading, charactersData])

  useEffect(() => {
    if (!battlesLoading && battlesData) {
      setBattles(battlesData)
    }
  }, [battlesLoading, battlesData])

  const value = {
    characters,
    battles,
    loading: charsLoading || battlesLoading
  }

  return (
    <ThreeKingdomsContext.Provider value={value}>
      {children}
    </ThreeKingdomsContext.Provider>
  )
}

export function useThreeKingdomsContext() {
  return useContext(ThreeKingdomsContext)
}