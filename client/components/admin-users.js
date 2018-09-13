import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { gotUser, userRemove, changeAuthority } from '../store/users';
import {me} from '../store'
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
    this.props.loadInitialData()
  }

  async deleteUser(event) {
    const userId = event.target.value;
    await this.props.userRemove(userId)
  }

  async admin(event) {
    var bool
    (event.target.value === "true") ? bool = true : bool = false

    const updatedData = {
      id: event.target.name,
      isAdmin: bool
    }

    await this.props.userAuthority(updatedData)
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
                  {
                    this.props.loggedInUser !== user.id &&
                    <div>
                      <p>admin? {user.isAdmin.toString()}
                        <select name={user.id} onChange={event => this.admin(event)}>
                          <option selected={!user.isAdmin} value={false}>USER</option>
                          <option selected={user.isAdmin} value={true}>ADMIN</option>
                        </select>
                      </p>
                      <button onClick={event => this.deleteUser(event)} value={user.id}>REMOVE</button>
                    </div>
                  }
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
    users: state.users,
    loggedInUser: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    gotUser: () => dispatch(gotUser()),
    userRemove: userId => dispatch(userRemove(userId)),
    userAuthority: user => dispatch(changeAuthority(user)),
    loadInitialData: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
