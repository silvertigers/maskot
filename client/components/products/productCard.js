import React from 'react'
import {Link} from 'react-router-dom'
import AddToCart from './AddToCart'
import {Card, Image} from 'semantic-ui-react'

const ProductCard = props => {
  return (
    <div className="product-card">
      <Link to={`/products/${props.product.id}`}>
        <Image size="medium" src={props.product.imageUrl} />
      </Link>

      <Card.Header className="product-card-header">
        {props.product.name}
      </Card.Header>

      <div className="product-card-buttons">
        <Card.Content className="product-card-content">
          <AddToCart product={props.product} />
        </Card.Content>
      </div>
    </div>
  )
}

export default ProductCard
