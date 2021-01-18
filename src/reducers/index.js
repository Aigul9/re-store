const initialState = {
    books: [],
    loading: true,
    error: false,
    cartItems: [],
    orderTotal: 1320
};

const updateCartItems = (cartItems, item, idx) => {
    console.log(idx);
    if (idx !== -1) {
        return [
            ...cartItems.slice(0, idx),
            item,
            ...cartItems.slice(idx + 1)
        ];
    }

    return [
        ...cartItems,
        item
    ];
};

const updateCartItem = (book, item = {}) => {

    const {
        id = book.id,
        title = book.title,
        count = 0,
        total = 0 } = item;

    return {
        id,
        title,
        count: count + 1,
        total: total + book.price
    };
}

const reducer = (state = initialState, action) => {
    // console.log(action.type);

    switch (action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                ...state,
                loading: true
            };
        case 'FETCH_BOOKS_SUCCESS':
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: false
            };
        case 'FETCH_BOOKS_FAILURE':
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            };
        case 'BOOK_ADDED_TO_CART':
            const bookId = action.payload;
            const book = state.books.find(book => book.id === bookId);
            const itemIndex = state.cartItems.findIndex(({id}) => id === bookId);
            const item = state.cartItems[itemIndex]; // elem or undefined

            const newItem = updateCartItem(book, item);
            console.log(newItem);
            
            return {
                ...state,
                cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
            };

        default:
            return state;
    }
};

export default reducer;