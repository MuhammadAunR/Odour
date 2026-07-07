"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ContextProvider = createContext();
export const useWishlist = () => useContext(ContextProvider);

import React from "react";
import { toast } from "react-toastify";

const WishlistContext = ({ children }) => {
  const [wishListItems, setWishListItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishListedProductIds");
    if (stored) setWishListItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishListedProductIds", JSON.stringify(wishListItems));
  }, [wishListItems]);

  const toggleWishList = (prodId) => {
    setWishListItems((prev) =>
      prev.includes(prodId)
        ? prev.filter((id) => id !== prodId)
        : [...prev, prodId],
    );

    toast.success(
      wishListItems.includes(prodId)
        ? "Removed from Wishlist"
        : "Added to Wishlist",
    );
  };
  return (
    <>
      <ContextProvider.Provider value={{ toggleWishList, wishListItems }}>
        {children}
      </ContextProvider.Provider>
    </>
  );
};

export default WishlistContext;
