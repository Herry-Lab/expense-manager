import React,{useState,useEffect} from 'react';

import useUser from './../hooks/use-user';
import ExpensesContext from './../context/expenses-context';
import { v4 as uuidv4 } from 'uuid';

let initialState = []
if(localStorage.getItem('expensesData')){
  let initData = localStorage.getItem('expensesData');
  initialState = JSON.parse(initData); 
}

const ExpenseProvider = ({children}) => {
  const [expenses,setExpenses] = useState(initialState)
  const {user:{id: uid}} = useUser();

  const addExpense = (expense) => {
    if(expense.des === '' || expense.amount === ''){
      return null
    }
    expense.id = uuidv4();
    expense.uid = uid;
    setExpenses((oldValues)=>{
      const newValues = oldValues.concat([expense]);
      localStorage.setItem('expensesData',JSON.stringify(newValues));
      return newValues;
    })
    return expense;
  }

  const deleteExpense = (id) => {
    setExpenses((oldValues)=>{
      const newValues = oldValues.filter(item => item.id != id)
      localStorage.setItem('expensesData',JSON.stringify(newValues));
      return newValues;
    })
  }

  return <ExpensesContext.Provider value={{
    expenses,
    addExpense,
    deleteExpense
  }}>
    {children}
  </ExpensesContext.Provider>
}

export default ExpenseProvider;