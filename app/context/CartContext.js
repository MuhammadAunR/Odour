'use client'
import React, { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"

export const ContextProvider = createContext()
export const useCart = () => useContext(ContextProvider)


const CartContext = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleAddCartItems = (i) => {
        setCartItems(prev => {
            const exist = prev.find(item => item.id === i.id)

            if (exist) {
                return prev.map(item =>
                    item.id === i.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [...prev, { ...i, quantity: 1 }]
        })
        toast.success('Added to cart')
    }

    const handleCheckout = () => {
        if (cartItems.length === 0) return
        const confirm = window.confirm('Continue Checkout')
        if (confirm) {
            setCartItems([])
            const msg = cartItems.map(i => `${i.name} x${i.quantity}`).join('%0A')
            window.open(`https://wa.me/923286536520?text=Order:%0A${msg}`)
            toast.success('Payment Successful')
        }else{
            toast.info('Checkout cancelled')
        }
    }

    const handleItemInc = (i) => {
        setCartItems(prev => {
            const exist = prev.find(item => item.id === i.id)
            if (exist) {
                return prev.map(item =>
                    item.id === i.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return prev
        })
    }

    const handleItemDec = (i) => {
        setCartItems(prev => {
            const exist = prev.find(item => item.id === i.id)
            if (exist) {
                if (exist.quantity === 1) {
                    return prev.filter(item => item.id !== i.id)
                }
                return prev.map(item =>
                    item.id === i.id ? { ...item, quantity: item.quantity - 1 } : item
                )
            }
            return prev
        })
    }

    const removeCartItem = (i) => {
        setCartItems(prev => {
            return prev.filter(item => item.id !== i.id)
        })
    }

    const handleSubTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0)

    return (
        <ContextProvider.Provider value={{
            isCartOpen, toggleCart, handleAddCartItems, cartItems, handleSubTotal, removeCartItem,
            handleItemDec, handleItemInc, handleCheckout
        }}>
            {children}
        </ContextProvider.Provider>
    )
}

export default CartContext