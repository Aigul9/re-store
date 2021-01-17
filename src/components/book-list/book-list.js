import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import * as actions from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import './book-list.css';

class BookList extends Component {
    componentDidMount() {
        // 1. receive data
        // 2. dispatch action to store
        const { bookstoreService, booksLoaded } = this.props;
        bookstoreService.getBooks()
            .then(data=> booksLoaded(data));
    }

    render() {
        const { books, loading } = this.props;
        if (loading) {
            return <Spinner/>;
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

const mapStateToProps = ({ books, loading }) => {
    return { books, loading }
};

// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators(actions, dispatch);
// }

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, actions)
)(BookList);