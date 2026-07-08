"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ContextProvider = createContext();
export const useWishlist = () => useContext(ContextProvider);

import React from "react";
import { toast } from "react-toastify";

const WishlistContext = ({ children }) => {
  const [wishListProducts, setWishListProducts] = useState([])


  useEffect(() => {
    const stored = localStorage.getItem("wishListedProducts");
    if (stored) setWishListProducts(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishListedProducts", JSON.stringify(wishListProducts));
  }, [wishListProducts]);

  const handleWishListItemsInLS = (prod) => {
    const exists = wishListProducts.some(
      item => item._id === prod._id
    );

    if (exists) {
      toast.success("Removed from wishlist");
      setWishListProducts(prev =>
        prev.filter(item => item._id !== prod._id)
      );
    } else {
      toast.success("Added to wishlist");
      setWishListProducts(prev => [...prev, prod]);
    }
  };

  return (
    <>
      <ContextProvider.Provider value={{ handleWishListItemsInLS, wishListProducts, wishListProducts }}>
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default WishlistContext;
