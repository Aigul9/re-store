import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        });
    }

    return dispatch(action);
};

const logMiddleware = ({getState}) => (next) => (action) => {
    console.log("middle", action.type, getState());
    return next(action);
};

// // has an access to store
// const stringEnhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return originalDispatch({
//                 type: action
//             });
//         }

//         originalDispatch(action);
//     };

//     return store;
// };

// // enhancers already exist in community
// const logEnhancer = (createStore) => (...args) => {
//     const store = createStore(...args);
//     const originalDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         console.log(action.type);
//         return originalDispatch(action);
//     };

//     return store;
// };

// const store = createStore(reducer);
// const store = createStore(reducer, logEnhancer);
// const store = createStore(reducer, compose(stringEnhancer, logEnhancer)); // first, second
const store = createStore(reducer, applyMiddleware(
    thunkMiddleware, stringMiddleware, logMiddleware)); // apply is an enhancer, lol

const delayedActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout);
};

// store.dispatch('ACTION');
store.dispatch(delayedActionCreator(3000));

// // monkey patching, if library does not support any extensions
// const originalDispatch = store.dispatch;
// store.dispatch = (action) => {
//     if (typeof action === 'string') {
//         return originalDispatch({
//             type: action
//         });
//     }

//     originalDispatch(action);
// };

export default store;