import React from 'react'
import CartContext from './CartContext'
import NavbarContext from './NavbarContext'
import QuickPopupContext from './QuickPopupContext'
import ProductContext from './ProductContext'

const AppWrapper = ({ children }) => {
    return (
        <>
            <ProductContext>
                <CartContext>
                    <NavbarContext>
                        <QuickPopupContext>
                            {children}
                        </QuickPopupContext>
                    </NavbarContext>
                </CartContext>
            </ProductContext>
        </>
    )
}

export default AppWrapper
