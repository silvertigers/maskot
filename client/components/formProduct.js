import React from 'react'

export const FormProduct = props => {
  const { name, imageUrl, description, quantity } = props

  return (
  <div>
    <form onSubmit={event => this.handleSubmit(event)}>
      <label htmlFor="name">Product Name</label>
      <input type="text" name="name" value={this.write} onChange={event => this.textChange(event)}/>

      <label htmlFor="imageUrl">Image Url</label>
      <input type="text" name="imageUrl" value={this.write} onChange={event => this.textChange(event)}/>

      <label htmlFor="description">Description</label>
      <textarea type="text" name="address" value={this.write} onChange={event => this.textChange(event)}/>

      <p>{props.quantity}</p>
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>

      <label htmlFor="quantity">Quantity</label>
      <input type="number" value={this.write} onChange={event => this.textChange(event)}></input>

      <label name="price">Price</label>
      <input type="number" value={this.write} onChange={event => this.textChange(event)}></input>

      <button disabled={!props.name || !props.description || !props.imageUrl}type="submit">Submit</button>

    </form>
  </div>
  )
}
