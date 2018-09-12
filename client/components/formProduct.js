import React from 'react'

export const FormProduct = props => {
  const { name, imageUrl, description, quantity, price } = props.value

  return (
  <div>
    <form onSubmit={event => props.handleSubmit(event)}>
      <label htmlFor="name">Product Name</label>
      <input type="text" name="name" value={name} onChange={event => props.textChange(event)}/>

      <label htmlFor="imageUrl">Image Url</label>
      <input type="text" name="imageUrl" value={imageUrl} onChange={event => props.textChange(event)}/>

      <label htmlFor="description">Description</label>
      <textarea type="text" name="address" value={description} onChange={event => props.textChange(event)}/>

      <p>{quantity}</p>
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>

      <label htmlFor="quantity">Quantity</label>
      <input type="number" value={this.write} onChange={event => props.textChange(event)}></input>

      <label name="price">Price</label>
      <input type="number" value={price} onChange={event => props.textChange(event)}></input>

      <button disabled={!name || !description || !imageUrl}type="submit">Submit</button>

    </form>
  </div>
  )
}
