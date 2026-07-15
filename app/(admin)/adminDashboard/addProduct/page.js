'use client'
import { useProductForm } from '@/app/context/admin/ProductFormContext'
import PriceSection from '@/components/admin/add-product/PriceSection'
import ProductClassificationSec from '@/components/admin/add-product/ProductClassificationSec'
import ProductInfoSec from '@/components/admin/add-product/ProductInfoSec'
import ProductMediaSec from '@/components/admin/add-product/ProductMediaSec'
import { SimpleLoader } from '@/components/admin/AuthPagesCompos'
import { SecondaryButton } from '@/components/UI/Buttons'
import { createProduct, uploadImage } from '@/services/productServices'
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'


const AddProduct = () => {

    const { productDetails, validateProduct, productImagePreview, resetProductForm } = useProductForm()
    const [loading, setLoading] = useState(false)

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
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
            resetProductForm();

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main className='py-5 px-2 space-y-5'>
                <header className='w-full'>
                    <h1 className='text-2xl font-bold text-center'>Add Product</h1>
                </header>

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
                    <h2 className='text-xl font-semibold'>Finalize and Save</h2>

                    {loading ?

                        <div className='flex items-center justify-end pr-5'>
                            <SimpleLoader />
                        </div>
                        :
                        <div className='flex items-center justify-end gap-7'>
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                className='bg-foreground/10 px-5 py-2.5 uppercase font-semibold hover:bg-foreground/20 transition-all ease-linear cursor-pointer'>Cancel</motion.button>
                            <span onClick={handleCreateProduct}>
                                <SecondaryButton text={'Save'} />
                            </span>
                        </div>
                    }
                </motion.section>
            </main>
        </>
    )
}

export default AddProduct