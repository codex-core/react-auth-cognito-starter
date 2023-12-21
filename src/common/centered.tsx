import React from 'react'

function Centered(props: Record<string,any>) {
  return (
    <div
     className='cx-centered-container'
  >
    <div className='cx-centered-container-child'>
      {props.children}
    </div>
  </div>
  )
}

export default Centered