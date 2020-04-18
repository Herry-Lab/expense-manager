import React from 'react'
import { Button, Callout, Card, Elevation, FormGroup, InputGroup } from "@blueprintjs/core";


import {  useHistory, Link } from 'react-router-dom';
import useUser from '../hooks/use-user';

function Login (){
  const {isLogin,login} = useUser();
  const history = useHistory();
  const [state, setState] = React.useState({email:'',password:''})
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

  const handleSubmit =  (event) => {
    event.preventDefault();
    setError('')
    const user = login(state)
    if(!user){
      setError('Email or Password  is Wrong');
    }
  }

  return(
    <div className="login-form">
      <Card interactive={true} elevation={Elevation.TWO} className="login-card">
        <form onSubmit={handleSubmit}>
          {error && <Callout intent="danger">{error}</Callout>}
          <h1>Login</h1>
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
            <Button type="submit" className="bp3-intent-primary">Login</Button>
            <span>Do not have account <Link to="/register">Register !</Link></span>
          </div>
        </form>
      </Card>

    {/*
      <Form onSubmit={handleSubmit}>
        {error && <h2>{error}</h2>}
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input value={state.email} type="email" name="email" id="email" placeholder="Enter Email"  onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input value={state.password} type="password" name="password" id="password" placeholder="Enter password" onChange={handleChange} />
        </FormGroup>
        <Button>Login</Button>
      </Form>
      <div>
        <p>Do not have account <Link to="/register">Register !</Link></p>
    </div>*/}
    </div>
  )
}

export default Login