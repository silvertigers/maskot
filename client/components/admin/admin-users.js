import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Menu,  Button, Card, Image, Modal, Checkbox } from 'semantic-ui-react'
import {
  gotUser,
  userRemove,
  changeAuthority,
  userTempPassword
} from '../../store/users'
import {me} from '../../store'
import NewUser from './newUser'

class AdminUsers extends Component {
  constructor() {
    super()
    this.state = {
      activeItem: "List"
    }
  }

  async componentDidMount() {
    this.props.gotUser()
    this.props.loadInitialData()
  }

  async deleteUser(event) {
    const userId = event.target.value
    await this.props.userRemove(userId)
  }

  async tempPassword(event) {
    console.log(event.target.value)

    const tempData = {
      id: event.target.value,
      password: '777'
    }
    await this.props.createTempPassword(tempData)
  }

  async admin(event) {
    // console.log(event.target)
    var bool
    event.target.value === 'true' ? (bool = true) : (bool = false)

    const updatedData = {
      id: event.target.name,
      isAdmin: bool
    }

    await this.props.userAuthority(updatedData)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { users } = this.props.users
    const { activeItem } = this.state

    return (
      <div className="admin_User_List">
        <Menu tabular>
          <Menu.Item name='List' active={activeItem === 'List'} onClick={this.handleItemClick} />
          <Menu.Item name='Add' active={activeItem === 'Add'} onClick={this.handleItemClick} />
        </Menu>
        {
          activeItem === 'Add' &&
          <NewUser add={this.handleItemClick}/>
        }
        {
          activeItem === 'List' &&
          <div>
            <h2>User List</h2>
              {
                users[0] ?
                users.map(user => {
                  return (
                    <div className="single-user-card" key={user.id}>
                    <Card>
                      <Card.Content>
                      <Card.Header key={user.id}>{user.email}</Card.Header>
                      {
                        this.props.loggedInUser !== user.id &&
                        <div>
                          <div>admin? <Card.Meta>{user.isAdmin.toString()}</Card.Meta>
                          {/* <Checkbox toggle label='Admin' value={true} onClick={event => this.admin(event)} defaultChecked={user.isAdmin}/> */}
                            <select name={user.id} onChange={event => this.admin(event)} value={user.isAdmin}>
                              <option value={false}>USER</option>
                              <option value={true}>ADMIN</option>
                            </select>
                          </div>
                          <div className="button">
                          <Button content='REMOVE' color='red' onClick={event => this.deleteUser(event)} value={user.id} icon='cancel' labelPosition='left' />
                          <Button content='TEMP PASSWORD' color='olive'/>
                          </div>
                          {/* <button onClick={event => this.deleteUser(event)} value={user.id}>REMOVE</button> */}
                          {/* <button value={user.id} onClick={event => this.tempPassword(event)}>TEMP PASSWORD</button> */}
                        </div>
                      }
                    </Card.Content>
                    </Card>
                    </div>
                  )
                })
                :
                <h2>None of Users are registered yet</h2>
              }
          </div>
        }
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
    createTempPassword: user => dispatch(userTempPassword(user)),
    loadInitialData: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)
