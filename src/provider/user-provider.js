import React,{useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

import UserContext from './../context/user-context'
import useUsers from './../hooks/use-users'

let blankState = {name : '' ,email:'',password:'',id:''}
let initialState = {...blankState}
let initialLogin = false
if(localStorage.getItem('usersData')){
  let initData = localStorage.getItem('usersData');
  let users = JSON.parse(initData); 
  const token = localStorage.getItem('token')
    if(token){
      const user = users.find((item) => item.id == token)
      if(user){
        initialState = user;
        initialLogin = true
      }
    }
}
const UserProvider = ({children}) => {
  const {addUser,users} = useUsers();
  const [user,setUser] = useState(initialState)
  const [isLogin,setIsLogin] = useState(initialLogin)

  const register = ({name,email,password}) => {
    const user = users.find((item) => item.email == email)
    if(user){
      return null;
    }
    let id = uuidv4()
    let userData = {
      name,
      email,
      password,
      id
    }
    setUser(userData)
    localStorage.setItem('token',userData.id)
    addUser(userData)
    return userData;
  }
  const login = ({email,password}) => {
    const user = users.find((item) => item.email == email && item.password == password)
    if(user){
      localStorage.setItem('token',user.id)
      setUser(user);
      return user;
    }
    else{
      return null;
    }
  }
  const resetUser = () => {
    localStorage.removeItem('token')
    setUser(blankState);
  }
  useEffect(() => {
    setIsLogin(user.id !== '')
  }, [user])

  return <UserContext.Provider value={{
    user, 
    setUser,
    resetUser,
    isLogin,
    login,
    register,
  }}>
    {children}
  </UserContext.Provider>

}

export default UserProvider;