import React from 'react'

const OrderSummaryLineItem = props => {
  const {name, imageUrl, price} = props.item.product
  const {quantity} = props.item
  return (
    <tr>
      <td>
        <img src={imageUrl} />
      </td>
      <td>{name}</td>
      <td className="summary product-price">$ {(price / 100).toFixed(2)}</td>
      <td>x</td>
      <td className="summary product-quantity">{quantity}</td>
      <td className="summary product-total-price">
        $ {(price * quantity / 100).toFixed(2)}
      </td>
    </tr>
  )
}

export default OrderSummaryLineItem
