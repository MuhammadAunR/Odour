'use client'

import { useAddProductForm } from "@/hooks/useAddProductForm"
import { createContext, useContext, useState } from "react"

export const ProductFormProvider = createContext()
export const useProductForm = () => useContext(ProductFormProvider)

import React from 'react'

const ProductFormContext = ({ children }) => {

    const { productDetails, setProductDetails, handleRemovePreviewImage, handleProductPreview, removeProductVariantCard, addProductVariantsCard, handleProductVariantInput, handleProductDetailsInput, validateProduct, handleProductDetailsViaButton, setProductImagePreview, productImagePreview, resetProductForm } = useAddProductForm()

    return (
        <ProductFormProvider.Provider value={{ productDetails, setProductDetails, handleRemovePreviewImage, handleProductPreview, removeProductVariantCard, addProductVariantsCard, handleProductVariantInput, handleProductDetailsInput, validateProduct, handleProductDetailsViaButton, setProductImagePreview, productImagePreview, resetProductForm }}>
            {children}
        </ProductFormProvider.Provider>
    )
}

export default ProductFormContext