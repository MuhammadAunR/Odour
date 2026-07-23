"use client";
import ProductGridCard, {
  ProductCardSkeleton,
  ProductListCard,
} from "@/components/UI/Card";
import ProductQuickView from "@/components/main/ProductQuickView";
import { Funnel, LayoutGrid, LayoutList, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilter } from "@/app/context/FilterContext";

const ShopPage = () => {
  const {
    toggleFilterSide,
    activeFilterCount,
    products,
    loading,
    setQueryParams,
    apiResponse,
  } = useFilter();

  const [productView, setProductView] = useState("grid");
  const [searchInput, setSearchInput] = useState("");
  const isInitialMount = useRef(true);

  const totalPages = apiResponse.totalPages;

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get("page")) || 1;

  const handleCurrentPage = (page) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setQueryParams((prev) => ({
      ...prev,
      page: page,
    }));
    window.scrollTo(0, 0);
  };

  const handelForwardPagination = () => {
    if (currentPage < totalPages) {
      handleCurrentPage(currentPage + 1)
    }
  };

  const handelBackwardPagination = () => {
    if (currentPage > 1) {
      handleCurrentPage(currentPage - 1)
    }
  };

  useEffect(() => {
    function handleProductView() {
      if (window.innerWidth <= 1025) {
        setProductView("grid");
      }
    }
    handleProductView();
    window.addEventListener("resize", handleProductView);
    return () => window.removeEventListener("resize", handleProductView);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      setQueryParams((prev) => ({
        ...prev,
        search: searchInput.trim(),
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput, setQueryParams]);
  return (
    <>
      <ProductQuickView />
      <main className="w-full max-w-7xl lg:w-10/12 lg:mx-auto px-5 lg:px-0 relative">
        <div className="flex flex-col justify-end gap-5 py-4 border-b border-foreground/10">
          <label
            htmlFor="search"
            className="flex items-center text-foreground/70"
          >
            <span className="px-2 border border-foreground/20 py-2">
              <Search />
            </span>
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              type="text"
              name="search"
              id="search"
              placeholder="Search our store"
              className="w-full outline-none px-3 border border-foreground/20 py-2 hover:bg-foreground/5 transition-all ease-linear text-foreground/70"
            />
          </label>

          <section className="flex items-center justify-between">
            <p className="text-sm text-foreground/50">
              Showing{" "}
              <span className="text-foreground font-semibold">
                {products.length}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-semibold">
                {apiResponse.total || 0}
              </span>{" "}
              products
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleFilterSide}
                className="text-foreground/70 border border-foreground/20 px-3 py-1 hover:text-foreground transition-all ease-linear flex items-center justify-center gap-2"
              >
                <span>
                  <Funnel size={16} />
                </span>
                <span className="flex items-center gap-1">
                  {activeFilterCount.length != 0
                    ? activeFilterCount.map((filter) => {
                      return (
                        <span
                          key={filter}
                          className="text-xs bg-foreground/5 p-1 rounded-lg"
                        >
                          {filter}
                        </span>
                      );
                    })
                    : "Filter"}
                </span>
              </button>

              <div className="flex items-center gap-1 border border-foreground/20 p-1 max-lg:hidden">
                <button
                  onClick={() => setProductView("grid")}
                  className={`p-1 rounded transition-colors ${productView === "grid" ? "bg-foreground text-background" : "text-foreground/40 hover:text-foreground"}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setProductView("list")}
                  className={`p-1 rounded transition-colors ${productView === "list" ? "bg-foreground text-background" : "text-foreground/40 hover:text-foreground"}`}
                >
                  <LayoutList size={16} />
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="flex gap-8 pt-5 max-lg:flex-col">
          <section className="flex-1 min-w-0 pb-5">
            {searchInput.trim() && products.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, ease: "easeInOut" }}
                className="w-full text-center md:text-lg text-muted"
              >
                No match Found
              </motion.div>
            )}
            <div className="min-h-[50vh]">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap justify-center items-center gap-2">
                  {products.map((prod, index) =>
                    productView === "grid" ? (
                      <ProductGridCard
                        key={prod._id}
                        product={prod}
                        index={index}
                      />
                    ) : (
                      <ProductListCard
                        key={prod._id}
                        product={prod}
                        index={index}
                      />
                    ),
                  )}
                </div>
              )}
            </div>

            {products.length > 0 && (
              <div className="flex items-center justify-center py-10 gap-3">
                <span
                  onClick={handelBackwardPagination}
                  className="border border-foreground/30 px-4 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear"
                >
                  Prev
                </span>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <span
                      key={i}
                      onClick={() => {
                        handleCurrentPage(i + 1);
                      }}
                      className={`border border-foreground/30 px-3 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear
                                        ${currentPage === i + 1 ? "bg-foreground/10" : "bg-background"}`}
                    >
                      {i + 1}
                    </span>
                  ))}
                </div>
                <span
                  onClick={handelForwardPagination}
                  className="border border-foreground/30 px-4 py-2 cursor-pointer hover:bg-foreground/5 transition-all ease-linear"
                >
                  Next
                </span>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default ShopPage;
