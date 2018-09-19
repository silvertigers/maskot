import React from 'react'
import {Link} from 'react-router-dom'
import AddToCart from './AddToCart'
import {List, Card, Image} from 'semantic-ui-react'

const ProductCard = props => {
  let newDescription = ''
  if (props.product.description.length >45){
    newDescription = props.product.description.slice(0,35) + '...'
  } else {
    newDescription = props.product.description
  }
  return (
    <li>
      <div className="product-card">
        <Link to={`/products/${props.product.id}`}>
          <Image size="medium" src={props.product.imageUrl} />
          <Card.Content>
            <Card.Header className="product-card-header">{props.product.name}</Card.Header>
            <Card.Description>
            {newDescription}
            </Card.Description>
          </Card.Content>
        </Link>
        <div className="product-card-buttons">
        <Card.Content className="product-card-content">
          <AddToCart product={props.product} />
        </Card.Content>
        </div>
      </div>
    </li>
  )
}

export default ProductCard
