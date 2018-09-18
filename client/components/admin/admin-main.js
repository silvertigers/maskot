import React, {Component} from 'react'
import {Header, Icon} from 'semantic-ui-react'

export default class AdminMain extends Component {
  render() {
    return (
      <div className="main">
      {/* <h1 color='black'>Admin Dashboard</h1>
      <p>Manage customers orders, stock of products and account settings.</p> */}
      <Header as='h2' icon>
        <Icon name='database' />
        Admin Dashboard
        <Header.Subheader>Manage customers orders, stock of products and account settings.</Header.Subheader>
      </Header>
      </div>
    )
  }
}
