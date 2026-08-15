'use client'

import PolicyContentSec from '@/components/main/PolicyPageComponents/PolicyContentSec'
import PolicyPageHeader from '@/components/main/PolicyPageComponents/PolicyPageHeader'
import { policyArticles, policyContent } from '@/constants/PolicyPageConst'
import { Shield } from 'lucide-react'

import React from 'react'

const PrivacyPolicy = () => {

    return (
        <>
            <PolicyPageHeader
                title={'Privacy Policy'}
                description={"We're committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your personal information as you explore and shop our fragrance collections."}
                date={'August 1, 2026'}
                icon={Shield}
            />

            <PolicyContentSec
                policyArticle={policyArticles}
                policyContent={policyContent}
            />
        </>
    )
}

export default PrivacyPolicy