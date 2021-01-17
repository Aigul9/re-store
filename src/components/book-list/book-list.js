import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import * as actions from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './book-list.css';

class BookList extends Component {
    componentDidMount() {
        // 1. receive data
        // 2. dispatch action to store
        console.log(this.props);
        const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props;
        booksRequested();
        bookstoreService.getBooks()
            .then(data => booksLoaded(data))
            .catch(err => booksError(err));
    }

    render() {
        const { books, loading, error } = this.props;
        if (loading) {
            return <Spinner/>;
        }
        console.log(this.props);
        if (error) {
            return <ErrorIndicator />
        }

        return (
            <ul className="book-list">
                {
                    books.map(book => {
                        return <li key={book.id}><BookListItem book={book}/></li>
                    })
                }
            </ul>
        );
    }
}

const mapStateToProps = ({ books, loading, error }) => {
    return { books, loading, error }
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(actions, dispatch);
// }

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, actions)
)(BookList);