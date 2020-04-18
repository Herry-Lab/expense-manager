import { useContext } from 'react';
import UsersContext from './../context/users-contex' 

const useUsers = () => {
  const values = useContext(UsersContext);
  return values
}

export default useUsers;