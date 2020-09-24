import React, { Component } from 'react';
import { products } from './products';
import { FormattedNumber, IntlProvider } from 'react-intl';
import { currencySubscriber, currencyHandler } from '../header/header';

const currencyType = (value, currency) => {
    return (
        <IntlProvider locale='en'>
            <FormattedNumber
                value={value}
                style="currency"
                currency={currency} />
        </IntlProvider>
    )
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCurrency: 'INR',
            exchangeRate: 1
        };
    }

    componentDidMount() {
        currencySubscriber.subscribe((currencyObject) => {
            this.setState(() => ({
                selectedCurrency: currencyObject.currency,
                exchangeRate: currencyObject.value
            }))
        });


    }

    componentWillUnmount() {
        currencySubscriber.unsubscribe();
    }

    render() {
        return (
            <div className="row">
                {products.map((e, i) => {
                    return (
                        <div className="col-md-4 col-sm-6 col-12 mb-5" key={i}>
                            <div className="card h-100 w-auto">
                                <div className="card-body">
                                    <img
                                        src={e.ImagePath}
                                        alt={e.Name}
                                        className="img-fluid center"
                                        style={{ "maxHeight": 150 }}
                                    />
                                </div>
                            </div>
                            <div className="text-center pt-2 mb-5">{currencyType(e.Price * this.state.exchangeRate, this.state.selectedCurrency)}</div>
                        </div>
                    )
                }).slice(0, 3)
                }
            </div>
        )
    }

}

export default Product;