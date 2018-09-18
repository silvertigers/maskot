import React from 'react'
import {Link} from 'react-router-dom'
import AddToCart from './AddToCart'
import {List, Card, Image} from 'semantic-ui-react'

const ProductCard = props => {
  return (
    <li className="col">
      <div className="product-cart">
        <Link to={`/products/${props.product.id}`}>
          <Image src={props.product.imageUrl} />
          <Card.Content>
            <Card.Header>{props.product.name}</Card.Header>
            <Card.Description>{props.product.description}</Card.Description>
          </Card.Content>
        </Link>
        <Card.Content>
          <AddToCart product={props.product} />
        </Card.Content>
      </div>
    </li>
  )
}

export default ProductCard
