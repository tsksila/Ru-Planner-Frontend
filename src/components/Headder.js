import React from 'react'
import {Link} from 'react-router-dom'

function Headder() {
    return (
        
        <ul>
          <li>
            <Link to="/">login</Link>
          </li>
          <li>
            <Link to="/register">register</Link>
          </li>
        </ul>
    
    )
}

export default Headder
