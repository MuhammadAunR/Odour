import React from 'react'
import CartContext from './CartContext'
import NavbarContext from './NavbarContext'
import QuickPopupContext from './QuickPopupContext'

const AppWrapper = ({ children }) => {
    return (
        <>
            <CartContext>
                <NavbarContext>
                    <QuickPopupContext>
                        {children}
                    </QuickPopupContext>
                </NavbarContext>
            </CartContext>
        </>
    )
}

export default AppWrapper
