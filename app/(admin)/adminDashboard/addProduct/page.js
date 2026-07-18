'use client'
import { useProductForm } from '@/app/context/admin/ProductFormContext'
import PriceSection from '@/components/admin/add-product/PriceSection'
import ProductClassificationSec from '@/components/admin/add-product/ProductClassificationSec'
import ProductInfoSec from '@/components/admin/add-product/ProductInfoSec'
import ProductMediaSec from '@/components/admin/add-product/ProductMediaSec'
import { SimpleLoader } from '@/components/admin/AuthPagesCompos'
import { SecondaryButton } from '@/components/UI/Buttons'
import { createProduct, fetchProductBySlug, removeImageFromCloudinary, updateProduct, uploadImage } from '@/services/productServices'
import { motion } from 'motion/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const AddProduct = () => {

    const { productDetails, validateProduct, productImagePreview, setProductImagePreview, resetProductForm, setProductDetails } = useProductForm()
    const [loading, setLoading] = useState(false)
    const [productFormAction, setProductFormAction] = useState('Save')
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathName = usePathname()

    useEffect(() => {
        const prodSlug = searchParams.get('slug')
        if (!prodSlug) return;
        async function getProductBySlug(prodSlug) {
            const results = await fetchProductBySlug(prodSlug)
            if (!results.ok) {
                toast.error(results.message)
            }
            const product = results.data;
            setProductFormAction('Update')
            setProductImagePreview(product.images)
            setProductDetails({
                _id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                attribute: product.attribute,
                gender: product.gender,
                season: product.season,
                fragranceFamily: product.fragranceFamily,
                variants: product.variants,
                images: product.images,
            });
        }
        getProductBySlug(prodSlug)
    }, [searchParams])

    useEffect(() => {
        resetProductForm()
    }, [pathName, searchParams])

    async function handleCreateProduct() {
        const error = validateProduct();
        if (error) {
            toast.warning(error);
            return;
        }

        try {
            setLoading(true);
            const uploadedImages = await Promise.all(
                productImagePreview.map(image =>
                    uploadImage(image.file)
                )
            );

            const payload = {
                ...productDetails,
                images: uploadedImages,
            };

            const { ok, data } = await createProduct(payload);

            if (!ok) {
                await removeImageFromCloudinary(productDetails.images)
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
            resetProductForm();

        } finally {
            setLoading(false);
        }
    }

    const handleCancel = () => {
        const error = validateProduct();
        if (error) {
            toast.warning(error);
            return;
        }
        if (productFormAction === 'Update' && window.confirm('Are you sure to cancel product update ?')) {
            router.push('/adminDashboard/productList')
            toast('Update Cancelled')
        }
        if (productFormAction === 'Save' && window.confirm('Are you sure to cancel product save ?')) {
            resetProductForm()
            toast.warning('Product not Saved')
        }
    }

    async function handleUpdateProduct() {
        setLoading(true)
        const uploadedImages = await Promise.all(
            productImagePreview.map(image =>
                uploadImage(image.file)
            )
        );
        const payload = {
            ...productDetails,
            images: uploadedImages,
        };

        const results = await updateProduct(payload)
        if (!results.ok) {
            toast.error(results.message)
            return
        }

        toast.success(results.message)
        resetProductForm()
        setLoading(false)
        setProductFormAction('Save')
        router.push('/adminDashboard/productList')
    }

    return (
        <>
            <main className='py-5 px-2 space-y-5'>
                <motion.header
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.01 }}
                    viewport={{ once: false }}
                    className='w-full py-7 px-5 bg-white shadow-lg rounded-2xl'>
                    <h1 className='text-2xl font-bold text-center'>Add Product</h1>
                </motion.header>

                <ProductInfoSec />
                <PriceSection />
                <ProductClassificationSec />
                <ProductMediaSec />

                <motion.section
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: false }}
                    className='space-y-5 bg-white shadow-xl p-3 rounded-2xl'>
                    <h2 className='text-xl font-semibold'>Finalize and {productFormAction}</h2>

                    {loading ?

                        <div className='flex items-center justify-end pr-5'>
                            <SimpleLoader />
                        </div>
                        :
                        <div className='flex items-center justify-end gap-7'>
                            <motion.button
                                onClick={handleCancel}
                                whileTap={{ scale: 0.97 }}
                                className='bg-foreground/10 px-5 py-2.5 uppercase font-semibold hover:bg-foreground/20 transition-all ease-linear cursor-pointer'>Cancel</motion.button>
                            <span onClick={productFormAction === 'Save' ? handleCreateProduct : handleUpdateProduct}>
                                <SecondaryButton text={productFormAction === 'Save' ? 'Save' : 'Update'} />
                            </span>
                        </div>
                    }
                </motion.section>
            </main>
        </>
    )
}

export default AddProduct