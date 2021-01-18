import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { fetchBooks } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './book-list.css';

const BookList = ({ books }) => {
    return (
        <ul className="book-list">
            {
                books.map(book => {
                    return <li key={book.id}><BookListItem book={book}/></li>
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
        const { books, loading, error } = this.props;
        if (loading) {
            return <Spinner/>;
        }

        if (error) {
            return <ErrorIndicator />
        }

        return <BookList books={books}/>
    }
}

// pass data from state to our component as props
const mapStateToProps = ({ books, loading, error }) => {
    return { books, loading, error };
};

// object form and functional form
const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch)
    }
};

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);