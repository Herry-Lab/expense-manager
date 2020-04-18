import React,{useState,useEffect} from 'react';

import useUser from './../hooks/use-user';
import IncomesContext from './../context/incomes-context';
import { v4 as uuidv4 } from 'uuid';

let initialState = []
if(localStorage.getItem('incomesData')){
  let initData = localStorage.getItem('incomesData');
  initialState = JSON.parse(initData); 
}

const IncomesProvider = ({children}) => {
  const [incomes,setIncomes] = useState(initialState)
  const {user:{id: uid}} = useUser();

  const addIncome = (income) => {
    if(income.des === '' || income.amount === ''){
      return null
    }
    income.id = uuidv4();
    income.uid = uid;
    setIncomes((oldValues)=>{
      const newValues = oldValues.concat([income]);
      localStorage.setItem('incomesData',JSON.stringify(newValues));
      return newValues;
    })
    return income;
  }

  const deleteIncome = (id) => {
    setIncomes((oldValues)=>{
      const newValues = oldValues.filter(item => item.id != id)
      localStorage.setItem('incomesData',JSON.stringify(newValues));
      return newValues;
    })
  }
  return <IncomesContext.Provider value={{
    incomes,
    addIncome,
    deleteIncome
  }}>
    {children}
  </IncomesContext.Provider>
}

export default IncomesProvider;