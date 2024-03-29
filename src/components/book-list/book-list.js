import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { bindActionCreators } from 'redux';
import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
    return (
        <ul className="book-list">
            {
                books.map(book => {
                    return (
                        <li key={book.id}>
                            <BookListItem
                                book={book}
                                onAddedToCart={() => onAddedToCart(book.id)}/>
                        </li>
                    );
                })
            }
        </ul>
    );
};

class BookListContainer extends Component {
    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {
        const { books, loading, error, onAddedToCart } = this.props;
        if (loading) {
            return <Spinner/>;
        }

        if (error) {
            return <ErrorIndicator />
        }

        return <BookList books={books} onAddedToCart={onAddedToCart}/>
    }
}

// pass data from state to our component as props
const mapStateToProps = ({ bookList: { books, loading, error }}) => {
    return { books, loading, error };
};

// object form and functional form
const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch);
    // return {
    //     // fetchBooks: fetchBooks(bookstoreService, dispatch),
    //     fetchBooks: () => dispatch(fetchBooks(bookstoreService)()),
    //     onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    // }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);