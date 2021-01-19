import React from 'react';
import spinner from './spinner.svg';
import './spinner.css';

const Spinner = () => {
    return (
        <img src={spinner} className="spinner"/>
        // <div className="lds-css">
        //     <div className="lds-double-ring">
        //     <div></div>
        //     <div></div>
        //     </div>
        // </div>
    );
};

export default Spinner;