import React from 'react'
import {StripeProvider, Elements} from 'react-stripe-elements'
import CheckoutFrom from './CheckoutForm'

const Checkout = () => {
  return (
    <StripeProvider apiKey="pk_test_psRrsym52IH8wxnCWh0h08Tj">
      <Elements>
        <CheckoutFrom />
      </Elements>
    </StripeProvider>
  )
}

export default Checkout
