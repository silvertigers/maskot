import React, {Component} from 'react'
import {connect} from 'react-redux'
import { userAdd } from '../store/users';
import { FormUser } from "./formUser"

class NewUser extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      isAdmin: false,
    }
    this.textChange = this.textChange.bind(this);
    this.userType = this.userType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  textChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  userType(event) {
    event.target.value === "true" ?
    this.setState({
      [event.target.name]: true
    }) :
    this.setState({
      [event.target.name]: false
    })
  }

  async handleSubmit(event) {
    event.preventDefault();

    await this.props.post(this.state);
    this.props.add()
  };

  render() {

    return (
      <div>
        <h2 className="title">Add a new User</h2>

        <FormUser textChange={this.textChange} userType={this.userType} handleSubmit={this.handleSubmit} value={this.state}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    post: user => dispatch(userAdd(user)),
  };
}

export default connect(null, mapDispatchToProps)(NewUser)

