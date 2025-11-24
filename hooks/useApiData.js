// Custom hook for centralized API data management
import { useState, useEffect } from 'react'

export const useApiData = () => {
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://taptaptechnologies.com/wp-json/acf/v3/pages/530')
        
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const data = await response.json()
        
        // Log complete API structure for debugging
        // API Response received
        
        setApiData(data)
      } catch (err) {
        console.error('API Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { apiData, loading, error }
}