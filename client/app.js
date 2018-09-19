import React from 'react'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="body-container">
      <div><Navbar /></div>
      <div><Routes /></div>
    </div>
  )
}

export default App
