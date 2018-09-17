import React from 'react'

export const FormUser = props => {
  const { email, password } = props.value

  return (
    <div>
      <form onSubmit={event => props.handleSubmit(event)}>
        <label htmlFor="email">Emal Address</label>
        <input type="text" name="email" value={email} onChange={event => props.textChange(event)}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={event => props.textChange(event)}/>

        <select name="isAdmin" onChange={event => props.userType(event)}>
          <option value={false}>USER</option>
          <option value={true}>ADMIN</option>
        </select>

        <button disabled={!email || !password} type="submit">Submit</button>
      </form>
    </div>
  )
}
