import React, { useState } from 'react';
import './form.css'
import Graph from './Graph';

const Form = () => {
    const[state,setState] = useState({
        name:'',
        email:''
    })

    const[show, setShow] = useState(false)

    const handleChange = ( e ) =>{
       setState({...state,[e.target.name]:e.target.value})
    }
    console.log(state)
    const handleSubmit= ( e ) =>{
        e.preventDefault()
        let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        alert(res.test(state.email))
        if(!alert(res.test(state.email)))return
        setShow(true)
        setState({
            name:'',
            email:''
        })
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className="formHeading">
            <h3>WELCOME !</h3>
        </div>
        <br />
        <label >Enter Your Name</label><br />
        <input type="text" 
        autoComplete='off'
        name='name'
        onChange={handleChange}
        value={state.name}
        className='inputfield'/><br/><br />
        <label >Enter Your Email</label><br />
        <input type="email" 
        autoComplete='off'
        name='email'
        onChange={handleChange}
        value={state.email}
        className='inputfield'/><br/>
        <input type="submit"
        className='submitButton' />
    </form>
    {show && <Graph /> }
    </>
  )
}

export default Form