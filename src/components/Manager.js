import React from 'react'

import Incomes from './Incomes'
import Expenses from './Expenses'

const Manager = () => {
  
  return(
    <div className="manager-container">
      <div className="manager-item">
        <Incomes />
      </div>
      <div className="manager-item">
        <Expenses/>
      </div>
    </div>
  )
}

export default Manager