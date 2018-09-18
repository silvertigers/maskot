import React from 'react'
import OrderSummaryLineItem from './OrderSummaryLineItem'

const OrderSummary = props => {
  const {cart, order} = props
  const items = cart ? cart : order.products
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <table>
        <tbody>
          {items &&
            items.map(item => {
              return (
                <OrderSummaryLineItem
                  key={cart ? item.product.id : item.id}
                  quantity={
                    cart ? item.quantity : item.orderedProducts.quantity
                  }
                  item={cart ? item.product : item}
                />
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderSummary
