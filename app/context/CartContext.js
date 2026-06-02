'use client'
import React, { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"

export const ContextProvider = createContext()
export const useCart = () => useContext(ContextProvider)


const CartContext = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [selectedPriceAndSize, setSelectedPriceAndSize] = useState(null)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const handleAddCartItems = (i, { selectedSize = null, qty = 1 } = {}) => {

        const ssp = selectedSize ?? i.sizes.find(s => s.isDefault) ?? i.sizes[0];

        setCartItems(prev => {
            const exist = prev.find(item =>
                item._id === i._id && item.selectedSize.size === ssp.size
            );

            if (exist) {
                return prev.map(item =>
                    item._id === i._id && item.selectedSize.size === ssp.size
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { ...i, quantity: qty, selectedSize: ssp }]
        })
        toast.success('Added to cart')
        console.log(cartItems)
    }

    const handleCheckout = () => {
        if (cartItems.length === 0) return
        const confirm = window.confirm('Continue Checkout')
        if (confirm) {
            setCartItems([])
            const msg = cartItems.map(i =>
                `${i.name} (${i.selectedSize.size}) x${i.quantity} - PKR ${(i.selectedSize.discountedPrice ?? i.selectedSize.price) * i.quantity}`
            ).join('%0A')
            window.open(`https://wa.me/923286536520?text=Order:%0A${msg}`)
            toast.success('Payment Successful')
        } else {
            toast.info('Checkout cancelled')
        }
    }

    const handleItemInc = (i) => {
        setCartItems(prev => prev.map(item =>
            item._id === i._id && item.selectedSize.size === i.selectedSize.size
                ? { ...item, quantity: item.quantity + 1 }
                : item
        ));
    };

    const handleItemDec = (i) => {
        setCartItems(prev => {
            const exist = prev.find(item =>
                item._id === i._id && item.selectedSize.size === i.selectedSize.size
            );
            if (!exist) return prev;
            if (exist.quantity === 1) {
                return prev.filter(item =>
                    !(item._id === i._id && item.selectedSize.size === i.selectedSize.size)
                );
            }
            return prev.map(item =>
                item._id === i._id && item.selectedSize.size === i.selectedSize.size
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };
    const removeCartItem = (i) => {
        setCartItems(prev =>
            prev.filter(item =>
                !(item._id === i._id && item.selectedSize.size === i.selectedSize.size)
            )
        );
    };

    const handleSubTotal = cartItems.reduce((total, item) => {
        const finalPrice = item.selectedSize.discountedPrice ?? item.selectedSize.price;
        return (total + finalPrice * item.quantity);
    }, 0)

    return (
        <ContextProvider.Provider value={{
            isCartOpen, toggleCart, handleAddCartItems, cartItems, handleSubTotal, removeCartItem,
            handleItemDec, handleItemInc, handleCheckout, selectedPriceAndSize, setSelectedPriceAndSize
        }}>
            {children}
        </ContextProvider.Provider>
    )
}

export default CartContext