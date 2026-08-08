'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'

export function useCatalog(type) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
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

    const getItems = useCallback(async () => {
        setLoading(true)

        try {
            const res = await apiRequest(endpoint, 'GET')
            const data = await res.json()

            setItems(data.data)

            return data.data
        } finally {
            setLoading(false)
        }
    }, [endpoint])

    async function createItem(itemData) {
        setLoading(true)

        try {
            const res = await apiRequest(endpoint, 'POST', itemData)
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
                return
            }

            toast.success(data.message)
            await getItems()
            return data
        } finally {
            setLoading(false)
        }
    }

    async function updateItem(id, itemData) {
        setLoading(true)

        try {
            const res = await apiRequest(`${endpoint}/${id}`, 'PATCH', itemData)
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
                return
            }
            toast.success(data.message)
            await getItems()
            return data
        } finally {
            setLoading(false)
        }
    }

    async function deleteItem(id) {
        setLoading(true)
        setDeletingId(id)

        try {
            const res = await apiRequest(`${endpoint}/${id}`, 'DELETE')
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
                return
            }
            toast.success(data.message)
            setItems(prev => prev.filter(item => item._id !== id))
            await getItems()
            return data
        } finally {
            setLoading(false)
            setDeletingId(null)
        }
    }

    async function getItemById(id) {
        setLoading(true)
        try {
            const res = await apiRequest(`${endpoint}/${id}`, 'GET')
            const data = await res.json()

            if (!res.ok) {
                toast.error(data.message)
                return
            }

            return data.data
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
        deletingId,

        getItems,
        createItem,
        updateItem,
        deleteItem,
        getItemById,
    }
}