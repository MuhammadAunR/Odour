"use client";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/app/context/WishlistContext";
import { PrimaryButton } from "./Buttons";
import { seasonConfig } from "../main/Assets";
import { div } from "motion/react-client";

const ProductGridCard = ({ product, index }) => {
  const router = useRouter();
  const { toggleCart, addCartItemIdToLS } = useCart();
  const { handleWishListItemsInLS, wishListProducts } = useWishlist();

  const defaultPriceAndSize =
    product?.variants?.find((variant) => variant.originalPrice == product.defaultPrice) ||
    product?.variants?.[0] ||
    null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center group/ProductGridCard hover:shadow-xl transition-shadow ease-in-out duration-500 h-fit w-fit"
    >
      <div className="relative w-75 h-75 overflow-hidden">
        <Image
          onClick={() => router.push(`/product/${product.slug}`)}
          src={product.images[0].url}
          alt={product.name}
          fill
          priority
          sizes="300px"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium
                    ${product.gender[0].name === "Men"
              ? "bg-blue-950 text-background"
              : product.gender[0].name === "Women"
                ? "bg-pink-900 text-background"
                : "bg-foreground text-background"
            }`}
        >
          {product.gender[0].name}
        </span>

        {product.defaultSalePrice && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-red-500 text-white">
            -
            {Math.round(
              ((defaultPriceAndSize.originalPrice -
                defaultPriceAndSize.salePrice) /
                defaultPriceAndSize.originalPrice) *
              100,
            )}
            %
          </span>
        )}

        <motion.button
          onClick={() => {
            handleWishListItemsInLS(product);
          }}
          className="absolute bottom-3 md:-bottom-10 right-5 md:group-hover/ProductGridCard:bottom-5 p-1.5 bg-background/80 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer"
        >
          <Heart
            size={16}
            className={
              wishListProducts?.some(item => item._id === product._id)
                ? "fill-red-500 text-red-500"
                : "text-foreground"
            }
          />
        </motion.button>
      </div>

      <div className="p-4 w-full flex items-end justify-between">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <h3 className="md:text-xl font-bold font-serif">{product.name}</h3>
            {defaultPriceAndSize.stockQuantity === 0 &&
              <span className="text-red-700 font-bold text-xs">(Sold Out)</span>
            }
          </div>
          {product.defaultSalePrice ? (
            <div className="flex items-baseline gap-2">
              <span className="max-md:text-[10px] text-xs text-foreground/40 line-through">
                PKR {defaultPriceAndSize.originalPrice.toLocaleString()}
              </span>
              <span className="font-semibold text-red-500 max-md:text-sm">
                PKR {defaultPriceAndSize.salePrice.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="max-md:text-sm font-semibold text-foreground">
              PKR {defaultPriceAndSize.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            addCartItemIdToLS(product);
            toggleCart();
          }}
          disabled={defaultPriceAndSize.stockQuantity === 0}
          className={`rounded-full p-2 bg-foreground text-background hover:-translate-y-0.5 transition-all ease-linear duration-300 cursor-pointer
          disabled:cursor-not-allowed disabled:bg-foreground/60`}>
          <ShoppingBag strokeWidth={1.5} size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductGridCard;

const ProductListCard = ({ product, index }) => {
  const router = useRouter();
  const { toggleCart, addCartItemIdToLS } = useCart();
  const { handleWishListItemsInLS, wishListProducts } = useWishlist();

  const defaultPriceAndSize =
    product?.variants?.find((variant) => variant.originalPrice == product.defaultPrice) ||
    product?.variants?.[0] ||
    null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        viewport={{ once: true }}
        onClick={() => router.push(`/product/${product.slug}`)}
        className="flex items-center justify-start w-full group/ProductListCard hover:bg-foreground/5 hover:shadow-xl transition-all ease-in-out duration-500"
      >
        <div className="w-90 h-80 relative overflow-hidden">
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            priority
            sizes="360px"
            className="object-cover group-hover/ProductListCard:scale-105 transition-all ease-linear duration-500"
          />
        </div>
        <div className="flex items-center justify-between w-full p-5">
          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-start gap-5">
                <h1 className="font-semibold font-serif text-3xl tracking-wider">
                  {product.name}
                </h1>
                <span className="font-semibold">
                  ({defaultPriceAndSize.size})
                </span>
                {defaultPriceAndSize.stockQuantity === 0 &&
                  <span className="text-red-700 font-bold">(Sold Out)</span>
                }
              </div>
              <p className="text-muted max-w-lg">{product.description}</p>
            </div>

            <div className="flex flex-col gap-3 items-start">
              <div className="flex items-center justify-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-medium
                    ${product.gender[0].name === "Men"
                      ? "bg-blue-950 text-background"
                      : product.gender[0].name === "Women"
                        ? "bg-pink-900 text-background"
                        : "bg-foreground text-background"
                    }`}
                >
                  {product.gender[0].name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {product.season.map((sea) => {
                  const config = seasonConfig[sea.name];
                  return (
                    <span
                      key={sea._id}
                      className={`${config.color} ${config.bg} text-sm font-semibold tracking-[0.2em] uppercase px-3 py-1 border border-current/20`}
                    >
                      {config.icon} {sea.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="actionSection flex flex-col gap-3 items-end">
            {product.defaultSalePrice ? (
              <div className="flex flex-col items-end">
                <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white">
                  -
                  {Math.round(
                    ((defaultPriceAndSize.originalPrice -
                      defaultPriceAndSize.salePrice) /
                      defaultPriceAndSize.originalPrice) *
                    100,
                  )}
                  %
                </span>
                <span className="text-foreground/40 line-through text-sm">
                  PKR {defaultPriceAndSize.originalPrice.toLocaleString()}
                </span>
                <span className="font-bold text-red-500 text-xl">
                  PKR {defaultPriceAndSize.salePrice.toLocaleString()}
                </span>
                <span className="text-red-500 text-sm">
                  You save PKR{" "}
                  {(
                    defaultPriceAndSize.originalPrice -
                    defaultPriceAndSize.salePrice
                  ).toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="font-bold text-foreground text-lg">
                PKR {defaultPriceAndSize.originalPrice.toLocaleString()}
              </span>
            )}
            <div className="flex items-end justify-end gap-2 flex-wrap-reverse">
              <button
                onClick={(e) => {
                  (e.stopPropagation(), handleWishListItemsInLS(product));
                }}
                className="border border-foreground/30 p-1.5 cursor-pointer"
              >
                <Heart
                  className={
                    wishListProducts?.some(item => item._id === product._id)
                      ? "fill-red-500 text-red-500"
                      : "text-foreground/50"
                  }
                />
              </button>

              <span
                onClick={(e) => {
                  e.stopPropagation();
                  addCartItemIdToLS(product);
                  toggleCart();
                }}
              >
                <PrimaryButton text={"Add to Cart"} textSize="sm" disabled={defaultPriceAndSize.stockQuantity === 0 ? true : false} />
              </span>
            </div>
          </div>
        </div>
      </motion.div >
    </>
  );
};

export { ProductListCard };


const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-200 bg-white animate-pulse">
      {/* IMAGE WRAPPER */}
      <div className="relative w-full h-80 bg-gray-200">
        {/* TOP LEFT BADGE */}
        <div className="absolute top-2 left-2">
          <div className="h-5 w-14 bg-gray-300 rounded"></div>
        </div>

        {/* TOP RIGHT DISCOUNT */}
        <div className="absolute top-2 right-2">
          <div className="h-5 w-12 bg-gray-300 rounded"></div>
        </div>

        {/* HEART ICON */}
        <div className="absolute bottom-2 right-2">
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
        </div>

        {/* ACTION BUTTONS BAR */}
        <div className="absolute bottom-0 left-0 right-0 flex">
          <div className="w-1/2 h-10 bg-gray-300"></div>
          <div className="w-1/2 h-10 bg-gray-400"></div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-3 space-y-2">
        {/* TITLE */}
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>

        {/* BRAND */}
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>

        {/* PRICE ROW */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export { ProductCardSkeleton };
