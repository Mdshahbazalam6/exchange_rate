import React, { useState } from 'react';
import './form.css'
import Graph from './Graph';

const Form = () => {
    const[state,setState] = useState({
        name:'',
        email:''
    })
   
    const[nameError, setNameError] = useState(true)
    const[emailError, setEmailError] = useState(true)
   
    const[show, setShow] = useState(false)
    const[data,setData] = useState()

    const handleChange = ( e ) =>{
       setState({...state,[e.target.name]:e.target.value})
    }
    // console.log(state)
    const handleSubmit= ( e ) =>{
        e.preventDefault()
 
       
       let result = validate()

        if(result === false)return

        setShow(true)
        setState({
            name:'',
            email:''
        })
        let currentDate = new Date()
        let hours = currentDate.getHours() 
        let mins = currentDate.getMinutes() 
        // console.log(hours)
        getGraphData(hours,mins)
    }
   
    let currentDate = new Date()
    let hours = currentDate.getHours() 
    let mins = currentDate.getMinutes() 
    console.log(hours)

    async function getGraphData( hrs,mns ){
        console.log(hrs,mns)
     try {
        let res = await fetch('http://localhost:5000',{
            method:"POST",
            body: JSON.stringify({
              hrs,mns
            }),
            headers:{
              "Content-Type" : "application/json"
            }
        })
        let data = await res.json()
        console.log(data)
        setData(data.cache)
     } catch (error) {
        console.log(error)
     }
    }


    function validate ( ){
        let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let nameregex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        let name = (nameregex.test(state.name))
        let email = (res.test(state.email))

        setNameError(name)
        setEmailError(email)
        console.log(name,email)
        return name,email
    }
    console.log(data)

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
        className='inputfield'/>

       {nameError ? '' : <p style={{color:'red',fontSize:'10px',marginLeft:'10%'}}>Enter Valid name</p> }
        <br/><br />

        <label >Enter Your Email</label><br />

        <input type="email" 
        autoComplete='off'
        name='email'
        onChange={handleChange}
        value={state.email}
        className='inputfield'/><br/>

        {emailError ? '' : <p style={{color:'red',fontSize:'10px',marginLeft:'10%'}}>Enter Valid Email</p> }

        <input type="submit"
        className='submitButton' />

    </form>
    {show ? <Graph /> : ''}
    <div className="clickTime">
        
        <div className="timeBox">
        {
           !data ? '' : data.oldHour === 0 ?<h3>Last Click was made Just now</h3> : data.hour-data.oldHour === 1 ? <h3>Last Click was made {` ${60-data.oldMinute+data.minutes} minutes ago`}</h3> : data.hour-data.oldHour > 1  ? <h3>Last Click was made {` ${data.hour-data.oldHour} hour ago`}</h3> : <h3>Last Click was made {` ${data.minutes - data.oldMinute} minutes ago`}</h3>
        }
        </div>
        </div>
    </>
  )
}

export default Form