import React from 'react'
import {Link} from 'react-router-dom'
import AddToCart from './AddToCart'

const ProductCard = props => {
  return (
    <li>
      <Link to={`/products/${props.product.id}`}>
        <img src={props.product.imageUrl} />
      </Link>
      <h3>{props.product.name}</h3>
      <p>{props.product.description}</p>
      <AddToCart product={props.product} />
    </li>
  )
}

export default ProductCard
