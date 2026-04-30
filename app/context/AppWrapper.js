import React from 'react'
import CartContext from './CartContext'
import NavbarContext from './NavbarContext'

const AppWrapper = ({ children }) => {
    return (
        <>
            <CartContext>
                <NavbarContext>
                    {children}
                </NavbarContext>
            </CartContext>
        </>
    )
}

export default AppWrapper
