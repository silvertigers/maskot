import React from 'react'

export const FormProduct = props => {
  const { name, imageUrl, description, quantity, price, categories } = props.value

  return (
  <div>
    <form onSubmit={event => props.handleSubmit(event)}>
      <label htmlFor="name">Product Name</label>
      <input type="text" name="name" value={name} onChange={event => props.textChange(event)}/>

      <label htmlFor="imageUrl">Image Url</label>
      <input type="text" name="imageUrl" value={imageUrl} onChange={event => props.textChange(event)}/>

      <label htmlFor="description">Description</label>
      <textarea type="text" name="description" value={description} onChange={event => props.textChange(event)}/>

      <input name="quantity" onChange={event => props.textChange(event)} value={quantity} type="number"/>
      <button type="button" onClick={props.increment}>+</button>
      <button type="button" onClick={props.decrement}>-</button>

      <label name="price">Price</label>
      <input type="number" name="price" value={price} onChange={event => props.textChange(event)}></input>

      <label name="categoryId">Categories</label>
      {
        props.category.categories.map(category => {
          return (
            <div key={category.id}>
            <input type="checkbox" name="categoryId" value={category.id} onClick={props.inputCategory}></input>{category.type}
            </div>
          )
        })
      }
      <br/>
      <button disabled={!name || !description || !imageUrl}type="submit">Submit</button>

    </form>
  </div>
  )
}
