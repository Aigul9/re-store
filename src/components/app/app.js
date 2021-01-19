import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, CartPage } from '../pages';
import { connect } from 'react-redux';
import ShopHeader from '../shop-header';

const App = ({ numItems, total }) => {
    console.log(numItems, total);
    return (
        <main role="main" className="container">
            <ShopHeader numItems={numItems} total={total}/>
            <Switch>
                <Route path="/" component={HomePage} exact/>
                <Route path="/cart" component={CartPage}/>
            </Switch>
        </main>
    );
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal }}) => {
    return {
      numItems: cartItems.reduce((len, { count }) => len + count, 0),
      total: orderTotal
    }
};

export default connect(mapStateToProps)(App);