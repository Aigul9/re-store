import { createStore, compose } from 'redux';
import reducer from './reducers';

const stringEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return originalDispatch({
                type: action
            });
        }

        originalDispatch(action);
    };

    return store;
};

// enhancers already exist in community
const logEnhancer = (createStore) => (...args) => {
    const store = createStore(...args);
    const originalDispatch = store.dispatch;
    store.dispatch = (action) => {
        console.log(action.type);
        return originalDispatch(action);
    };

    return store;
};

// const store = createStore(reducer);
// const store = createStore(reducer, logEnhancer);
const store = createStore(reducer, compose(stringEnhancer, logEnhancer)); // first, second

store.dispatch('ACTION');

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