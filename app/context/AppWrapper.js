import React from 'react'
import CartContext from './CartContext'

const AppWrapper = ({children}) => {
    return (
        <>
            <CartContext>
                {children}
            </CartContext>
        </>
    )
}

export default AppWrapper
