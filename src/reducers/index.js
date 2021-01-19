const initialState = {
    books: [],
    loading: true,
    error: false,
    cartItems: [],
    orderTotal: 1320
};

const updateCartItems = (cartItems, item, idx) => {
    if (item.count === 0) {
        return [
            ...cartItems.slice(0, idx),
            ...cartItems.slice(idx + 1)
        ]
    }

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

const updateCartItem = (book, item = {}, quantity) => {

    const {
        id = book.id,
        title = book.title,
        count = 0,
        total = 0 } = item;

    return {
        id,
        title,
        count: count + quantity,
        total: total + book.price * quantity
    };
};

const updateOrder = (state, bookId, quantity) => {
    const { books, cartItems } = state;
    const book = books.find(({id}) => id === bookId);
    const itemIndex = cartItems.findIndex(({id}) => id === bookId);
    const item = cartItems[itemIndex]; // elem or undefined

    const newItem = updateCartItem(book, item, quantity);
    
    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
    };
};

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
            return updateOrder(state, action.payload, 1);
        case 'BOOK_DELETED_FROM_CART':
            return updateOrder(state, action.payload, -1);
        case 'ALL_BOOKS_DELETED_FROM_CART': {
            const item = state.cartItems.find(({id}) => id === action.payload);
            return updateOrder(state, action.payload, -item.count);
        }
        default:
            return state;
    }
};

export default reducer;