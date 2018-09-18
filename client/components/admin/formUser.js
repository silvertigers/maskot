import React from 'react'
import {Form} from 'semantic-ui-react'

export const FormUser = props => {
  const { email, password } = props.value

  return (
    <div className="addForm">
      <h2 className="title">Add a new User</h2>
      <Form onSubmit={event => props.handleSubmit(event)}>
      <Form.Field>
        <label htmlFor="email">Emal Address</label>
        <input type="text" name="email" value={email} onChange={event => props.textChange(event)}/>
      </Form.Field>
      <Form.Field>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={event => props.textChange(event)}/>
      </Form.Field>
        <select name="isAdmin" onChange={event => props.userType(event)}>
          <option value={false}>USER</option>
          <option value={true}>ADMIN</option>
        </select>
        <Form.Button disabled={!email || !password} type="submit" color="blue">Submit</Form.Button>
      </Form>
    </div>
  )
}
