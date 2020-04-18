import React,{useState,useEffect} from 'react';
import UsersContext from './../context/users-contex'

let initialState = []
if(localStorage.getItem('usersData')){
  let initData = localStorage.getItem('usersData');
  initialState = JSON.parse(initData); 
}

const UsersProvider = ({children}) => {
  const [users,setUsers] = useState(initialState)
  const addUser = (user) => {
    setUsers((oldValues)=>{
      const newValues = oldValues.concat([user]);
      return newValues;
    })
  }
  useEffect(() => {
    localStorage.setItem('usersData',JSON.stringify(users))
  }, [users])
  return <UsersContext.Provider value={{
    users, 
    addUser,
  }}>
    {children}
  </UsersContext.Provider>

}

export default UsersProvider;