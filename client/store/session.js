const GET_SESSION = 'GET_SESSION'
export const getSession = sessionId => ({type: GET_SESSION, sessionId})

const defaultSession = ''

export default function(state = defaultSession, action) {
  switch (action.type) {
    case GET_SESSION:
      return action.sessionId
    default:
      return state
  }
}
