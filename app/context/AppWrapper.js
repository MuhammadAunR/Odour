import React from 'react'
import CartContext from './CartContext'
import NavbarContext from './NavbarContext'
import ProductContext from './ProductContext'
import FilterContext from './FilterContext'
import WishlistContext from './WishlistContext'

const AppWrapper = ({ children }) => {
    return (
        <>
            <FilterContext>
                <ProductContext>
                    <CartContext>
                        <NavbarContext>
                            <WishlistContext>
                                {children}
                            </WishlistContext>
                        </NavbarContext>
                    </CartContext>
                </ProductContext>
            </FilterContext>
        </>
    )
}

export default AppWrapper
