import React from 'react';
import BookList from '../book-list';
import ShoppingCartTable from '../shopping-cart-table';

const HomePage = () => {
    return (
        <>
            <div>Home Page</div>
            <BookList />
            <ShoppingCartTable/>
        </>
    );
};

export default HomePage;