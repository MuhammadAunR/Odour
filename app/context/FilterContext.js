"use client";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

export const FilterProvider = createContext();
export const useFilter = () => useContext(FilterProvider);

const FilterContext = ({ children }) => {

  const searchParams = useSearchParams()
  const [isFilterSideOpen, setIsFilterSideOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [products, setProducts] = useState([]);
  const [activeFilterCount, setActiveFilterCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([])

  const [queryParams, setQueryParams] = useState({
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 12,
    gender: searchParams.get("gender") || "",
    attribute: searchParams.get("attribute") || "",
    category: searchParams.get("category") || "",
    season: searchParams.get("seasone") || "",
    fragranceFamily: searchParams.get("fragranceFamily") || "",
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "",
  });

  const apiUrl = React.useMemo(() => {
    const cleanParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, v]) => v !== "" && v !== null),
    );

    const params = new URLSearchParams(cleanParams);
    return `/api/products?${params.toString()}`;
  }, [queryParams]);

  useEffect(() => {
    setLoading(true);
    async function fetchAllProducts() {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("Raw data from FilterContext", data);
      setProducts(data.products);
      setApiResponse(data);
      setLoading(false);
    }

    fetchAllProducts();
  }, [apiUrl]);

  useEffect(() => {
    async function fetchAvailableFilters() {
      const res = await fetch('api/products/filters', {
        method: 'GET',
      })
      const data = await res.json()
      setFilters(data.filters)
    }
    fetchAvailableFilters()
  }, [])


  const toggleFilterSide = () => {
    setIsFilterSideOpen(!isFilterSideOpen);
  };

  return (
    <FilterProvider.Provider
      value={{
        toggleFilterSide,
        isFilterSideOpen,
        setActiveFilterCount,
        activeFilterCount,
        filters,
        queryParams,
        setQueryParams,
        loading,
        products,
        apiResponse,
      }}
    >
      {children}
    </FilterProvider.Provider>
  );
};

export default FilterContext;
