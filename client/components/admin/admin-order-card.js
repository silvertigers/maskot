import React from 'react'
import {Link} from 'react-router-dom'

const AdminOrderCard = props => {
  const {changeOrderStatus, orderStatus, orderCancelled} = props
  const {id, email, userId, sessionId, status} = props.order
  return (
    <li key={id}>
      {userId ? (
        <Link to={`/users/${userId}/orders/${id}`}>
          <h3>{email}</h3>
        </Link>
      ) : (
        <Link to={`/guests/${sessionId}/orders/${id}`}>
          <h3>{sessionId}</h3>
        </Link>
      )}

      <h2>status: {status}</h2>
      <select name={id} onChange={changeOrderStatus} value={status}>
        <option value="placed">Placed</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      {!(status === 'completed' || status === 'cancelled') && (
        <div>
          <button name={id} value={status} onClick={orderStatus} type="button">
            Next status
          </button>
          <button name={id} onClick={orderCancelled} type="button">
            Cancel
          </button>
        </div>
      )}
    </li>
  )
}

export default AdminOrderCard
