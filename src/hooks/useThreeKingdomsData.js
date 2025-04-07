import { useState, useEffect } from 'react'
import axios from 'axios'
import { fallbackCharacters, fallbackBattles } from '../data/fallbackData'

const API_URL = 'https://67f0b47e2a80b06b8898695a.mockapi.io'

const useThreeKingdomsData = (endpoint) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (process.env.NODE_ENV === 'development') {
          throw new Error('Using fallback data in development')
        }

        const response = await axios.get(`${API_URL}/${endpoint}`, {
          timeout: 5000,
          signal: controller.signal
        })
        
        if (!isMounted) return

        if (!response.data) {
          throw new Error('No data available')
        }

        setData(response.data)
      } catch (err) {
        if (!isMounted || axios.isCancel(err)) return
        
        console.log("Using fallback data for:", endpoint)
        
        const resourceType = endpoint.startsWith('battles') ? 'battles' : 'characters'
        const fallbackData = resourceType === 'battles' ? fallbackBattles : fallbackCharacters
        
        if (endpoint.includes('/')) {
          const id = endpoint.split('/')[1]
          const foundItem = fallbackData.find(item => 
            item.id.toString() === id || 
            item.id === parseInt(id)
          )
          
          if (foundItem) {
            setData(foundItem)
          } else {
            setError(`Data not found in fallback for ${endpoint}`)
            setData(null)
          }
        } else {
          setData(fallbackData)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [endpoint])

  return { data, loading, error }
}

export default useThreeKingdomsData