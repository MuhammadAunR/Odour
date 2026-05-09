import React from 'react'
import CartContext from './CartContext'
import NavbarContext from './NavbarContext'
import QuickPopupContext from './QuickPopupContext'
import ProductContext from './ProductContext'
import FilterContext from './FilterContext'

const AppWrapper = ({ children }) => {
    return (
        <>
            <FilterContext>
                <ProductContext>
                    <CartContext>
                        <NavbarContext>
                            <QuickPopupContext>
                                {children}
                            </QuickPopupContext>
                        </NavbarContext>
                    </CartContext>
                </ProductContext>
            </FilterContext>
        </>
    )
}

export default AppWrapper
