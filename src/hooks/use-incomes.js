import { useContext } from 'react';
import IncomesContext from '../context/incomes-context' 

const useIncomes = () => {
  const values = useContext(IncomesContext);
  return values
}

export default useIncomes;