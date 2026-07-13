import React from 'react'
import CartContext from './CartContext'
import NavbarContext from './NavbarContext'
import QuickPopupContext from './QuickPopupContext'
import ProductContext from './ProductContext'
import FilterContext from './FilterContext'
import WishlistContext from './WishlistContext'
import SidebarContext from './admin/SidebarContext'

const AppWrapper = ({ children }) => {
    return (
        <>
            <FilterContext>
                <ProductContext>
                    <CartContext>
                        <NavbarContext>
                            <QuickPopupContext>
                                <WishlistContext>
                                    <SidebarContext>
                                        {children}
                                    </SidebarContext>
                                </WishlistContext>
                            </QuickPopupContext>
                        </NavbarContext>
                    </CartContext>
                </ProductContext>
            </FilterContext>
        </>
    )
}

export default AppWrapper
