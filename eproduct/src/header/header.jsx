import React from 'react';
import { BehaviorSubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';


const currencySubscriber = new BehaviorSubject({currency: "INR", value: 1});

const currencyHandler = (e) => {

    const currencyT = String(e.target.id).toUpperCase();
    //api call
    ajax.getJSON('https://api.exchangeratesapi.io/latest?base=INR').subscribe((data) => {
        const exchangeRates = JSON.parse(JSON.stringify(data["rates"]));
        const exchangeValue = JSON.parse(JSON.stringify(currencyT));
        currencySubscriber.next({currency: currencyT, value:exchangeRates[exchangeValue]});
    });
}
        

function Appheader() {

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <a href="#" className="navbar-brand">E-Products</a>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            id="currencyDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >Currency</a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="currencyDropdown">
                            <a href="#" className="dropdown-item" id="inr" onClick={e => currencyHandler(e)}>INR</a>
                            <a href="#" className="dropdown-item" id="usd" onClick={e => currencyHandler(e)}>USD</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export {    
    currencySubscriber,
    Appheader,
    currencyHandler

}