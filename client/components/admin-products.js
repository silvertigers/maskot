import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class AdminProducts extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <div className="admin_Product_List">
          <div className="admin_Product_details">
            <h2>dummy list</h2>
          </div>
          <div className="admin_Product_Edit_Button">
            <h3>button</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AdminProducts)
