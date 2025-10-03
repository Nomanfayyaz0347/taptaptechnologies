// Custom hook for About page API data
import { useState, useEffect } from 'react'

export const useAboutApiData = () => {
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://taptaptechnologies.com/wp-json/wp/v2/pages/867')
        if (!response.ok) {
          throw new Error('Failed to fetch About page data')
        }
        const data = await response.json()
        setApiData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { apiData, loading, error }
}
