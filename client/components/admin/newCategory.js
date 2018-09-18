import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCategory} from '../../store/category'
import {FormCategory} from './formCategory'

class NewCategory extends Component {
  constructor() {
    super()
    this.state = {
      type: ''
    }
    this.textChange = this.textChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  textChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    await this.props.post(this.state)
    this.props.add()
  }

  render() {
    return (
      <div>
        <h2 className="title">Add a new Category</h2>

        <FormCategory
          textChange={this.textChange}
          handleSubmit={this.handleSubmit}
          value={this.state}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: category => dispatch(addCategory(category))
  }
}

export default connect(null, mapDispatchToProps)(NewCategory)
