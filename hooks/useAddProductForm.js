'use client'
import React, { useState } from 'react'

export const useAddProductForm = () => {

    const [productImagePreview, setProductImagePreview] = useState([])
    const [productDetails, setProductDetails] = useState({
        productName: '',
        description: '',
        category: [],
        attribute: [],
        gender: [],
        season: [],
        fragranceFamily: [],
        variants: [
            {
                size: '',
                originalPrice: '',
                salePrice: null,
                stockQuantity: '',
            }
        ],
        images: [],
    })
    const validateProduct = () => {
        const {
            productName,
            description,
            category,
            attribute,
            gender,
            season,
            fragranceFamily,
            variants,
        } = productDetails;

        if (!productName.trim()) return 'Product name is required';
        if (!description.trim()) return 'Description is required';

        if (!fragranceFamily.length) return 'Select at least one fragrance family';
        if (!season.length) return 'Select at least one season';
        if (!category.length) return 'Select at least one category';
        if (!attribute.length) return 'Select at least one attribute';
        if (!gender.length) return 'Select at least one gender';

        if (!productImagePreview.length) return 'Add at least one image';

        for (const variant of variants) {
            if (!variant.size.trim()) return 'Variant size is required';
            if (!variant.originalPrice) return 'Variant price is required';
            if (variant.stockQuantity === '') return 'Variant stock is required';
        }

        return null;
    };

    const handleProductDetailsInput = (e) => {
        const { name, value } = e.target
        setProductDetails(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleProductDetailsViaButton = (field, value) => {
        setProductDetails(prev => ({
            ...prev,
            [field]: prev[field].includes(value) ? prev[field].filter(item => item !== value) : [...prev[field], value]
        }))
    }

    const handleProductVariantInput = (index, field, value) => {
        setProductDetails(prev => ({
            ...prev,
            variants: prev.variants.map((variant, i) => {
                return i === index ? { ...variant, [field]: value } : variant
            })
        }))
    }

    const addProductVariantsCard = () => {
        setProductDetails(prev => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    size: '',
                    originalPrice: '',
                    salePrice: null,
                    stockQuantity: '',
                }
            ]
        }))
    }

    const removeProductVariantCard = (index) => {
        if (productDetails.variants.length === 1) return
        setProductDetails(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }))
    }

    const handleProductPreview = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (!file) return;

        setProductImagePreview(prev => [
            ...prev,
            {
                file,
                id: crypto.randomUUID(),
                url: URL.createObjectURL(file),
                fileName: file.name.split('.')[0]
            }
        ]);
    };
    const handleRemovePreviewImage = (id) => {
        setProductImagePreview(prev => prev.filter(img => img.id !== id))
    }

    const resetProductForm = () => {
        setProductDetails({
            productName: '',
            description: '',
            category: [],
            attribute: [],
            gender: [],
            season: [],
            fragranceFamily: [],
            variants: [
                {
                    size: '',
                    originalPrice: '',
                    salePrice: null,
                    stockQuantity: '',
                }
            ],
            images: [],
        })
        setProductImagePreview([])
    }

    return {
        productDetails, setProductDetails, handleRemovePreviewImage, handleProductPreview, removeProductVariantCard, addProductVariantsCard, handleProductVariantInput, handleProductDetailsInput, validateProduct, handleProductDetailsViaButton, setProductImagePreview, productImagePreview, resetProductForm
    };
}
