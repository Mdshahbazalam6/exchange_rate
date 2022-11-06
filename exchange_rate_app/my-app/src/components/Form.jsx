import React, { useState } from 'react';
import './form.css'
import Graph from './Graph';

const Form = () => {
    const[state,setState] = useState({
        name:'',
        email:''
    })

    const[show, setShow] = useState(false)
    const[data,setData] = useState()

    const handleChange = ( e ) =>{
       setState({...state,[e.target.name]:e.target.value})
    }
    // console.log(state)
    const handleSubmit= ( e ) =>{
        e.preventDefault()
        let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        alert(res.test(state.email))
        // if(!alert(res.test(state.email)))return
        setShow(true)
        setState({
            name:'',
            email:''
        })
        let currentDate = new Date()
        let hours = currentDate.getHours() 
        let mins = currentDate.getMinutes() 
        console.log(hours)
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
    {show ? <Graph /> : ''}
    <div className="clickTime">
        
        <div className="timeBox">
        {hours < 10 ? <h3 >{`Last Click was made at 0${hours}:`} </h3> : <h3 >{`Last Click was made at ${hours}:`} </h3>}
        {mins < 10 ? <h3 >{` 0${mins}`} </h3> : <h3 >{` ${mins}`} </h3>}
        {
           !data ? '' : data.hour-data.oldHour > 0  ? <h3>{` ${data.hour-data.oldHour} hour ago`}</h3> : <h3>{` ${data.minutes - data.oldMinute} minutes ago`}</h3>
        }
        </div>
        </div>
    </>
  )
}

export default Form