import React from 'react'

export const FormCategory = props => {
  const { type } = props.value

  return (
    <div>
      <form onSubmit={event => props.handleSubmit(event)}>
        <label htmlFor="type">Catetory Type</label>
        <input type="text" name="type" value={type} onChange={event => props.textChange(event)}/>

        <button disabled={!type} type="submit">Submit</button>
      </form>
    </div>
  )
}
