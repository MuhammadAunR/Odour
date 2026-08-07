'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'

export function useCatalog(type) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [deletingId, setDeletingId] = useState(null)

    const endpoint = `/api/catalog/${type}`

    const apiRequest = async (url, method, body = null) => {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        return await fetch(url, options)
    }

    const checkResponse = (response, data) => {
        if (!response.ok) {
            setError(data.message || 'Something went wrong')
            return false
        }

        return true
    }

    const getItems = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await apiRequest(endpoint, 'GET')
            const data = await res.json()

            if (!checkResponse(res, data)) return

            setItems(data.data)

            return data.data
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    async function createItem(itemData) {
        setLoading(true)
        setError(null)

        try {
            const res = await apiRequest(endpoint, 'POST', itemData)
            const data = await res.json()

            if (!checkResponse(res, data)) return

            await getItems()

            return data
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateItem(id, itemData) {
        setLoading(true)
        setError(null)

        try {
            const res = await apiRequest(`${endpoint}/${id}`, 'PATCH', itemData)
            const data = await res.json()

            if (!checkResponse(res, data)) return

            await getItems()

            return data
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function deleteItem(id, itemData) {
        setLoading(true)
        setDeletingId(id)
        setError(null)

        try {
            const res = await apiRequest(`${endpoint}/${id}`, 'DELETE', itemData)
            const data = await res.json()

            if (!checkResponse(res, data)) return
            toast.success(data.message)
            await getItems()
            return data
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
            setDeletingId(null)
        }
    }

    async function getItemById(id) {
        setLoading(true)
        setError(null)

        try {
            const res = await apiRequest(`${endpoint}/${id}`, 'GET')
            const data = await res.json()

            if (!checkResponse(res, data)) return

            return data.data
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getItems()
    }, [getItems])

    return {
        items,
        loading,
        error,
        deletingId,

        getItems,
        createItem,
        updateItem,
        deleteItem,
        getItemById,
    }
}