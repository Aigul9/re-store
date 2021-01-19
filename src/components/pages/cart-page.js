import React from 'react';
import ShoppingCartTable from '../shopping-cart-table';
import './pages.css';

const CartPage = () => {
    return (
        <>
            <div className="logo text-dark">Cart Page</div>
            <ShoppingCartTable/>
        </>
    );
};

export default CartPage;