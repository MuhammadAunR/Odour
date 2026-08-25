import CartContext from "../context/CartContext";

export default function CheckoutLayout({ children }) {
    return (
        <>
            <CartContext>
                {children}
            </CartContext>
        </>
    )
}