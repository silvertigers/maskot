import React from 'react'
import {Form, Input} from 'semantic-ui-react'

export const FormCategory = props => {
  const { type } = props.value

  return (
    <div>
      <Form onSubmit={event => props.handleSubmit(event)}>
        <Input
          icon='tags'
          iconPosition='left'
          label={{ tag: true, content: 'Add Tag' }}
          labelPosition='right'
          placeholder='Enter Category'
          name="type" value={type} onChange={event => props.textChange(event)}
        />
        <Form.Button disabled={!type} color='blue' type="submit">Submit</Form.Button>
      </Form>
    </div>
  )
}
