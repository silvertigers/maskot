import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Button, Card, Image, Modal} from 'semantic-ui-react'
import {getProducts, productRemove} from '../../store/products'
import NewProduct from './newProduct'
import EditProduct from './editProduct'

class AdminProducts extends Component {
  constructor() {
    super()
    this.state = {
      isEdit: 0,
      activeItem: 'List'
    }
    this.edit = this.edit.bind(this)
    // this.password = this.password.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  async removeProduct(event) {
    const productId = event.target.value
    await this.props.productRemove(productId)
  }

  edit(event) {
    const id = Number(event.target.value)

    this.state.isEdit === id
      ? this.setState({
          isEdit: 0
        })
      : this.setState({
          isEdit: Number(event.target.value)
        })
  }

  // password() {
  //   const temp = this.state.test
  //   this.setState({
  //     test: "new password time"
  //   })
  //   setTimeout(() => {
  //     this.setState({
  //       test: temp
  //     })
  //   },5000)
  // }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {products} = this.props.products
    const {activeItem} = this.state

    return (
      <div>
        <div className="admin_Product_List">
          <Menu tabular>
            <Menu.Item
              name="List"
              active={activeItem === 'List'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Add"
              active={activeItem === 'Add'}
              onClick={this.handleItemClick}
            />
          </Menu>
          {this.state.activeItem === 'Add' && (
            <NewProduct add={this.handleItemClick} />
          )}
          {/* <button onClick={this.password}>password reset</button> */}
          {/* <ul> */}
          {this.state.activeItem === 'List' && (
            <div>
              <h2>Products List</h2>
              <div className="card-view">
                {products[0] ? (
                  products.map(product => {
                    return (
                      <div key={product.id} className="single-card">
                        <Card>
                          <Card.Content>
                            <Image
                              floated="right"
                              size="tiny"
                              src={product.imageUrl}
                            />
                            <Card.Header>
                              Product Name: {product.name}
                            </Card.Header>
                            <Card.Meta>
                              In stock:{' '}
                              {product.quantity
                                ? product.quantity
                                : 'OUT OF STOCK'}
                            </Card.Meta>
                            <Card.Description>
                              Price: ${product.price}
                              <div className="category">
                                {product.categories &&
                                  product.categories.map(category => {
                                    return (
                                      <div key={category.id} id="category">
                                        #{category.type}
                                      </div>
                                    )
                                  })}
                              </div>
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <div className="ui two buttons">
                              <EditProduct
                                edit={this.state.isEdit}
                                id={product.id}
                              />
                              <Button
                                basic
                                color="red"
                                onClick={event => this.removeProduct(event)}
                                value={product.id}
                              >
                                REMOVE
                              </Button>
                            </div>
                          </Card.Content>
                        </Card>
                      </div>
                    )
                  })
                ) : (
                  <h3>None of products are available at this time</h3>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts()),
    productRemove: productId => dispatch(productRemove(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)
