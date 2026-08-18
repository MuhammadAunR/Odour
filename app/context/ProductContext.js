"use client";
import React, { useCallback, useEffect, useState } from "react";
import { createContext, useContext } from "react";

export const ContextProvider = createContext();
export const useProducts = () => useContext(ContextProvider);

const ProductContext = ({ children }) => {
  const [apiResponse, setApiResponse] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLocalProducts = useCallback(
    async function fetchLocalProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          console.error('Fetch failed with status:', res.status);
          setProducts([]);
          setApiResponse({});
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Raw data from UnfilteredProducts", data);
        setProducts(data.products || []);
        setApiResponse(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setProducts([]);
        setApiResponse({});
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchLocalProducts();
  }, [fetchLocalProducts]);

  return (
    <ContextProvider.Provider value={{ products, apiResponse, loading }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ProductContext;
