import React, { useState, useEffect } from 'react'
import {HTMLTable, Overlay,Button, Callout, Card, Elevation, Navbar, Alignment, FormGroup, InputGroup, Icon } from "@blueprintjs/core";

import useExpenses from '../hooks/use-expenses'
import useUser from '../hooks/use-user'
import useExport from './../hooks/use-export'


const Expenses = () => {
  const {addExpense,deleteExpense,expenses} = useExpenses();
  const [items,setItems] = useState([]);
  const {user} = useUser();
  const [error,setError] = React.useState('')
  const [expense,setExpense] = useState({des:'Mercedes',amount:'50000'})
  const { exportPDF } = useExport()

  const exportData = () => {
    const data = items.map(item => ([item.des, '$' + item.amount]))
    const total =  items.reduce((acc, item) => acc+=parseFloat(item.amount), 0)
    data.push(['Total',  '$' + total ])
    exportPDF(
      'Expense Report',
      [["Description", "Amount"]],
      data
    )
  }

  useEffect(() => {
    const data = expenses.filter(item => item.uid == user.id)
    setItems(data)
  },[expenses,user])

  const handleChange = e => {
    const { name, value } = e.target;
    setExpense(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const handleSubmit =  (event) =>{
    event.preventDefault();
    setError('')
    const retExpense = addExpense({...expense})
    if(!retExpense){
      setError('Please Fill all data');
    }
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure ?')) {
      deleteExpense(id)
    }
  }

  const total = React.useMemo( () => {
    return items.reduce((acc, item) => acc+=parseFloat(item.amount), 0)
  }, [items])

  return(
    <Card elevation={Elevation.TWO} className="custom-card">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <strong>Expense</strong>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Button icon="export" onClick={exportData} intent="success" text="Export"/>
        </Navbar.Group>
      </Navbar>
      <div className="card-content">
        
        <HTMLTable>
          <thead>
            <tr>
              <th>No.</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.des}</td>
                  <td>{item.amount}</td>
                  <td><Icon icon="delete" intent="danger" onClick={() => {handleDelete(item.id)}} /></td>              
                </tr>
              ))
            }
            <tr key="total">
              <td></td>
              <td><strong>Total</strong></td>
              <td><strong>{total}</strong></td>
              <td></td>              
            </tr>
          </tbody>
        </HTMLTable>
        <br />
        <form onSubmit={handleSubmit}>
          {error && <Callout intent="danger">{error}</Callout>}
          <br/>
          <FormGroup
              label="Expense Description"
              labelFor="des"
              labelInfo="(required)"
            >
            <InputGroup value={expense.des} type="text" name="des" id="des" placeholder="Enter Expenses description" onChange={handleChange} />
          </FormGroup>
          <FormGroup
            label="Expenses Amount"
            labelFor="amount"
            labelInfo="(required)"
          >
            <InputGroup value={expense.amount} type="number" name="amount" id="amount" placeholder="Enter amount" onChange={handleChange} />
          </FormGroup>
          <Button type="submit" alignText intent="primary" rightIcon="add">Add</Button>
        </form>
      </div>
    </Card>
  )
}

export default Expenses