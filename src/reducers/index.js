const initialState = {
    books: [],
    loading: true,
    error: false,
    cartItems: [
        {
            id: 1,
            name: 'Book 1',
            count: 3,
            total: 420
        },
        {
            id: 2,
            name: 'Book 2',
            count: 7,
            total: 900
        }
    ],
    orderTotal: 1320
};

const reducer = (state = initialState, action) => {
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
        default:
            return state;
    }
};

export default reducer;