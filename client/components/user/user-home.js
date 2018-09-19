import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Header} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div style={{padding: '40px'}}>
      <Header as="h1" color="olive">
        {email ? `Welcome, ${email}!` : 'Welcome!'}
      </Header>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
