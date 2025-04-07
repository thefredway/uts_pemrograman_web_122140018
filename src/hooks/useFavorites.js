import { useState, useEffect } from 'react'

export default function useFavorites(key) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (e) {
        localStorage.removeItem(key)
      }
    }
  }, [key])

  const addFavorite = (item) => {

    if (!favorites.some(fav => fav.id === item.id)) {
      const updated = [...favorites, item]
      setFavorites(updated)
      localStorage.setItem(key, JSON.stringify(updated))
    }
  }

  const removeFavorite = (id) => {
    const updated = favorites.filter(fav => fav.id !== id)
    setFavorites(updated)
    localStorage.setItem(key, JSON.stringify(updated))
  }

  const isFavorite = (id) => favorites.some(fav => fav.id === id)

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
