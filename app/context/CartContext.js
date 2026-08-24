"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ContextProvider = createContext();
export const useCart = () => useContext(ContextProvider);

const CartContext = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemInLS, setCartItemInLS] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedPriceAndSize, setSelectedPriceAndSize] = useState(null);
  const router = useRouter()

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const stored = localStorage.getItem("cartItemInLS");

    setCartItemInLS(stored ? JSON.parse(stored) : []);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem(
      "cartItemInLS",
      JSON.stringify(cartItemInLS)
    );
  }, [cartItemInLS, isInitialized]);

  const addCartItemIdToLS = (prod, { selectedSize = null, qty = 1 } = {}) => {
    const ssop = selectedSize ?? prod.variants.find(variant => variant.originalPrice == prod.defaultPrice) ?? prod.variants[0]
    setCartItemInLS((prev) => {
      const exist = prev.find((item) => item._id === prod._id && item.selectedSize.size === ssop.size)
      if (exist) {
        return prev.map(
          (item) => item._id === prod._id && item.selectedSize.size === ssop.size
            ? { ...item, quantity: item.quantity + qty } : item)
      }
      return [...prev, { ...prod, quantity: qty, selectedSize: ssop }]
    })
    toast.success('Added to Cart')
  }

  const handleCheckout = () => {
    if (cartItemInLS.length === 0) {
      toast.info("Can't proceed with empty cart")
      return
    }
    router.push('/checkout')
  };

  const handleItemInc = (i) => {
    setCartItemInLS((prev) =>
      prev.map((item) =>
        item._id === i._id && item.selectedSize.size === i.selectedSize.size
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const handleItemDec = (i) => {
    setCartItemInLS((prev) => {
      const exist = prev.find(
        (item) =>
          item._id === i._id && item.selectedSize.size === i.selectedSize.size,
      );
      if (!exist) return prev;
      if (exist.quantity === 1) {
        return prev.filter(
          (item) =>
            !(
              item._id === i._id &&
              item.selectedSize.size === i.selectedSize.size
            ),
        );
      }
      return prev.map((item) =>
        item._id === i._id && item.selectedSize.size === i.selectedSize.size
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  };
  const removeCartItem = (i) => {
    setCartItemInLS((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === i._id && item.selectedSize.size === i.selectedSize.size
          ),
      ),
    );
  };

  const handleSubTotal = cartItemInLS.reduce((total, item) => {
    const finalPrice =
      item.selectedSize.salePrice ?? item.selectedSize.originalPrice;
    return total + finalPrice * item.quantity;
  }, 0);

  return (
    <ContextProvider.Provider
      value={{
        isCartOpen,
        toggleCart,
        cartItemInLS,
        handleSubTotal,
        removeCartItem,
        handleItemDec,
        handleItemInc,
        handleCheckout,
        selectedPriceAndSize,
        setSelectedPriceAndSize,
        addCartItemIdToLS,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default CartContext;
