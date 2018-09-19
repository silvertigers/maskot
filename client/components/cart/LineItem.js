import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editCart} from '../../store/cart'
import {Grid, Image, Select, Button} from 'semantic-ui-react'

const createNumberList = number => {
  const list = []
  for (let i = 1; i <= number; i++) {
    list.push({key: i, value: i, text: `${i}`})
  }
  return list
}

class LineItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleChange(event, {value}) {
    const prodIndex = this.props.cart.findIndex(item => {
      return item.product.id === this.props.product.id
    })
    const newCart = [...this.props.cart]
    newCart[prodIndex].quantity = value
    this.props.editCart(newCart)
  }

  handleDelete(event) {
    const prodIndex = this.props.cart.findIndex(item => {
      return item.product.id === this.props.product.id
    })
    const {cart} = this.props
    const newCart = cart.slice(0, prodIndex).concat(cart.slice(prodIndex + 1))
    this.props.editCart(newCart)
  }

  render() {
    const {id, name, imageUrl, price} = this.props.product
    const {quantity} = this.props
    return (
      <Grid className="line-item">
        <Grid.Column width={4}>
          <Link to={`/products/${id}`}>
            <Image className="cart-image" src={imageUrl} />
          </Link>
        </Grid.Column>
        <Grid.Column width={4}>
          <h2>{name}</h2>
          <Button
            style={{marginTop: '20px'}}
            onClick={this.handleDelete}
            basic
            color="red"
          >
            Remove
          </Button>
        </Grid.Column>
        <Grid.Column
          style={{display: 'flex', justifyContent: 'space-around'}}
          id="checkout-price"
          width={4}
        >
          {`$ ${price / 100}`} x
          <div className="select-wrap">
            <Select
              fluid
              style={{width: '50px'}}
              className="select-quantity"
              placeholder={`${quantity}`}
              options={createNumberList(10)}
              onChange={this.handleChange}
            />
          </div>
          {`$ ${(price * quantity / 100).toFixed(2)}`}
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({cart: state.cart})
const mapDispatchToProps = dispatch => ({
  editCart: products => dispatch(editCart(products))
})

export default connect(mapStateToProps, mapDispatchToProps)(LineItem)
