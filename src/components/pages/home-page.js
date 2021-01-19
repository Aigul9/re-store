import React from 'react';
import BookList from '../book-list';
import './pages.css';

const HomePage = () => {
    return (
        <>
            <div className="logo text-dark">Home Page</div>
            <BookList />
        </>
    );
};

export default HomePage;