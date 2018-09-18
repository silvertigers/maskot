import React from 'react'
import {Form, Checkbox} from 'semantic-ui-react'

export const FormProduct = props => {
  const { name, imageUrl, description, quantity, price, categories } = props.value

  return (
  <div>
    <Form onSubmit={event => props.handleSubmit(event)}>
    <Form.Field>
      <label htmlFor="name">Product Name</label>
      <input type="text" name="name" value={name} placeholder='Product Name' onChange={event => props.textChange(event)}/>
    </Form.Field>
    <Form.Field>
      <label htmlFor="imageUrl">Image Url</label>
      <input type="text" name="imageUrl" value={imageUrl} placeholder='Image Url'onChange={event => props.textChange(event)}/>
    </Form.Field>
    <Form.Field>
      <label htmlFor="description">Description</label>
      <textarea type="text" name="description" value={description} placeholder='Description' onChange={event => props.textChange(event)}/>
    </Form.Field>
    <Form.Field>
      <label htmlFor="quantity">Quantity</label>
      <input name="quantity" onChange={event => props.textChange(event)} value={quantity} type="number"/>
      <button type="button" onClick={props.increment}>+</button>
      <button type="button" onClick={props.decrement}>-</button>
    </Form.Field>
    <Form.Field>
      <label name="price">Price</label>
      <input type="number" name="price" value={price} onChange={event => props.textChange(event)}></input>
    </Form.Field>
    <Form.Field>
      <label name="categoryId">Categories</label>
    </Form.Field>
    <Form.Group inline>
      {
        props.category.categories.map(category => {
          return (
            <div className="category" key={category.id}>
            {/* <input type="checkbox" name="categoryId" value={category.id} onClick={props.inputCategory}checked={categories.indexOf(category.id) > -1}></input>{category.type} */}
            <Checkbox label={category.type} type="checkbox" name="categoryId" value={category.id} onClick={props.inputCategory}
            defaultChecked={categories.indexOf(category.id) > -1}/>
            </div>
          )
        })
      }
    </Form.Group>
      <Form.Button disabled={!name || !description || !imageUrl || !categories.length}type="submit" color='blue'>Submit</Form.Button>
    </Form>
  </div>
  )
}
