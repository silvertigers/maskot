import React, {Component} from 'react';
import {connect} from 'react-redux';
import { gotUser, userRemove } from '../store/users';
import NewUser from "./newUser";

class AdminUsers extends Component {
  constructor() {
    super()
    this.state = {
      isAdd: false,
    }
    this.add = this.add.bind(this)
  }

  async componentDidMount() {
    this.props.gotUser();
  }

  async deleteUser(event) {
    const userId = event.target.value;
    await this.props.userRemove(userId)
  }

  add() {
    this.state.isAdd ?
    this.setState({
      isAdd: false,
    }) :
    this.setState({
      isAdd: true,
    })
  }

  render() {
    const { users } = this.props.users

    return (
      <div>
        <h2>User List</h2>
        <span onClick={this.add}>ADD</span>
        {
          this.state.isAdd ?
          <NewUser add={this.add}/> : <h2>click add button if you want to add a new product</h2>
        }
        <ul>
          {
            users[0] ?
            users.map(user => {
              return (
                <li key={user.id}>
                  <h3>{user.email}</h3>
                  <p>admin? {user.isAdmin.toString()}</p>
                  <button>EDIT</button>
                  <button onClick={event => this.deleteUser(event)} value={user.id}>REMOVE</button>
                </li>
              )
            })
            :
            <h2>None of Users are registered yet</h2>
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotUser: () => dispatch(gotUser()),
    userRemove: userId => dispatch(userRemove(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
