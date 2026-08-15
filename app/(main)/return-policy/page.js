'use client'

import PolicyContentSec from '@/components/main/PolicyPageComponents/PolicyContentSec'
import PolicyPageHeader from '@/components/main/PolicyPageComponents/PolicyPageHeader'
import { returnArticles, returnContent } from '@/constants/PolicyPageConst'
import { RefreshCcw } from 'lucide-react'
import { motion } from 'motion/react'
import React, { useState } from 'react'

const ReturnPolicy = () => {

    const [articleInView, setArticleInView] = useState('introduction')

    const navigateToArticle = (e, id) => {
        e.preventDefault()
        const target = document.getElementById(id)
        setArticleInView(id)
        if (target && window.lenis) {
            window.lenis.scrollTo(target, { offset: -300 })
        }
    }

    return (
        <>
            <PolicyPageHeader
                title={'Return & Refund Policy'}
                description={"We want you to love every fragrance you order. If something isn't right, our return policy outlines exactly how we make it easy to return, exchange, or get a refund."}
                date={'August 1, 2026'}
                icon={RefreshCcw}
            />

            <PolicyContentSec
                policyArticle={returnArticles}
                policyContent={returnContent}
            />
        </>
    )
}

export default ReturnPolicy