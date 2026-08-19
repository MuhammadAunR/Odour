import React from 'react'
import CartContext from './CartContext'
import NavbarContext from './NavbarContext'
import ProductContext from './ProductContext'
import WishlistContext from './WishlistContext'

const AppWrapper = ({ children }) => {
    return (
        <>  
                <ProductContext>
                    <CartContext>
                        <NavbarContext>
                            <WishlistContext>
                                {children}
                            </WishlistContext>
                        </NavbarContext>
                    </CartContext>
                </ProductContext>
        </>
    )
}

export default AppWrapper
