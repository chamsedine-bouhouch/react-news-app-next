import axiosInstance from '@/lib/axios'
import { useEffect, useState } from 'react'

export const useNews = () => {
    const [categories, setCategories] = useState(null)
    const [sources, setSources] = useState(null)
    /**
     * Get News Categories
     */
    const fetchCategories = () => {
        axiosInstance.get('/api/news/categories')
            .then(reponse => {
                setCategories(reponse.data)
            }).catch(error => console.error(error))
    }
    const fetchSources = () => {
        axiosInstance.get('/api/news/sources')
            .then(reponse => {
                setSources(reponse.data)
            }).catch(error => console.error(error))
    }
    useEffect(() => {
        fetchCategories()
        fetchSources(), []
    })
    return {
        categories,
        sources,
        fetchCategories,
        fetchSources,
    }
}