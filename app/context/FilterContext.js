"use client";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

export const FilterProvider = createContext();
export const useFilter = () => useContext(FilterProvider);

const FilterContext = ({ children }) => {
  const [isFilterSideOpen, setIsFilterSideOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [activeFilterCount, setActiveFilterCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 12,
    gender: "",
    season: "",
    fragranceFamily: "",
    search: "",
    sort: "id_asc",
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
      console.log("Raw data", data);
      setProducts(data.products);
      setApiResponse(data);
      setLoading(false);

      const filterTypes = ["gender", "season", "fragranceFamily"];

      const filters = filterTypes
        .filter((key) => Array.isArray(data[key]))
        .map((key) => ({
          title:
            key === "fragranceFamily"
              ? "Fragrance Family"
              : key.charAt(0).toUpperCase() + key.slice(1),
          key: key,
          options: data[key]
            .map((item) => ({
              value: item._id,
              count: item.count || 0,
            }))
            .sort((a, b) => a.value.localeCompare(b.value)),
        }));
      setFilters(filters);
    }

    fetchAllProducts();
  }, [apiUrl]);

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
