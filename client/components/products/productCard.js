import React from 'react'
import {Link} from 'react-router-dom'
import AddToCart from './AddToCart'
import {Card, Image} from 'semantic-ui-react'

const ProductCard = props => {
  return (
    <div className="product-card" style={{maxWidth: '350px'}}>
      <Link to={`/products/${props.product.id}`}>
        <Image
          size="medium"
          style={{
            maxHeight: '275px',
            maxWidth: '275px',
            minHeight: '275px',
            minWidth: '275px',
            objectFit: 'cover'
          }}
          src={props.product.imageUrl}
        />
      </Link>

      <h2 className="product-card-header">{props.product.name}</h2>

      <div className="product-card-buttons">
        <Card.Content className="product-card-content">
          <AddToCart product={props.product} />
        </Card.Content>
      </div>
    </div>
  )
}

export default ProductCard
