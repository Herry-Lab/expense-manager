import { useContext } from 'react';
import ExpensesContext from '../context/expenses-context' 

const useExpenses = () => {
  const values = useContext(ExpensesContext);
  return values
}

export default useExpenses;