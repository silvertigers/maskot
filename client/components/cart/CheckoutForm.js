import React from 'react'
import {Field, reduxForm} from 'redux-form'

const RenderInput = ({input, meta, label}) => {
  return (
    <div className="field-wrap">
      {meta.error &&
        meta.touched && <span className="warning">{meta.error}</span>}
      <label>{label}: </label>
      <input {...input} placeholder={label} className="form-control" />
    </div>
  )
}

class CheckoutForm extends React.Component {
  render() {
    return (
      <form>
        <Field name="owner.name" label="Name" component={RenderInput} />
        <Field
          name="owner.address_line1"
          label="Address Line 1"
          component={RenderInput}
        />
        <Field
          name="owner.address_line2"
          label="Address Line 2"
          component={RenderInput}
        />
        <Field name="owner.address_city" label="City" component={RenderInput} />
        <Field
          name="owner.address_state"
          label="State"
          component={RenderInput}
        />
        <Field
          name="owner.address_zip"
          label="Zipcode"
          component={RenderInput}
        />
      </form>
    )
  }
}

export default reduxForm({form: 'owner'})(CheckoutForm)

// const validate = values => {
//   const errors = {}
//   if (!values.name) {
//     errors.name = 'required'
//   }
//   if (!values.city) {
//     errors.city = 'required'
//   }
//   return errors
// }

// state.form.owner.values
