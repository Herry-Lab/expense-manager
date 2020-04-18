import React from 'react'
import { Button, Callout, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core";


import {  useHistory, Link } from 'react-router-dom';
import useUser from '../hooks/use-user';
import useUsers from './../hooks/use-users'

function Register (){
  const {users} =useUsers();
  const {isLogin,register} = useUser();
  const history = useHistory();
  const [loading,setLoading] = React.useState(false)
  const [state, setState] = React.useState({name:'',email:'',password:''})
  const [error,setError] = React.useState('')


  React.useEffect(() => {
    if(isLogin){
      history.push('/manager')
    }
  }, [history,isLogin])
  
  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({
        ...prevState,
        [name]: value
    }));
  }

  const handleSubmit =  (event) =>{
    event.preventDefault();
    setError('')
    const user = register(state)
    if(!user){
      setError('Email already exists');
    }
  }

  if(loading) {
    return <h1>Loading ...</h1>
  }

  return(
    <div className="login-form">
      <Card interactive={true} elevation={Elevation.TWO} className="login-card">
        <form onSubmit={handleSubmit}>
          {error && <Callout intent="danger">{error}</Callout>}
          <h1>Register</h1>
          <FormGroup
            label="Name"
            labelFor="name"
            labelInfo="(required)"
          >
            <InputGroup value={state.name} type="text" name="name" id="name" placeholder="Enter Name"  onChange={handleChange}  />
          </FormGroup>
          <FormGroup
            label="Email"
            labelFor="email"
            labelInfo="(required)"
          >
            <InputGroup value={state.email} type="email" name="email" id="email" placeholder="Enter Email"  onChange={handleChange}  />
          </FormGroup>
          <FormGroup 
            label="Password"
            labelFor="password"
            labelInfo="(required)"
          >
            <InputGroup value={state.password} type="password" name="password" id="password" placeholder="Enter password" onChange={handleChange} />
          </FormGroup>
          <div className="bottom-control">
            <Button type="submit" className="bp3-intent-primary">Register</Button>
            <span>Have account <Link to="/login">Login !</Link></span>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Register