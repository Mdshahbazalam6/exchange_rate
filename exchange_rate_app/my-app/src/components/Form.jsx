import React, { useState } from 'react';
import './form.css'
import Graph from './Graph';

const Form = () => {
    const[graphData,setGraphData] = useState([])//it will store the graph data
    const[state,setState] = useState({  //will store the value of the form
        name:'',
        email:''
    })
   
    const[nameError, setNameError] = useState(true)  
    const[emailError, setEmailError] = useState(true)
   
    const[show, setShow] = useState(false) // for deciding whether we need to show the graph and last clicked duration 
    const[data,setData] = useState() //it will store the data recieved from api call and from this state we'll access time

    const handleChange = ( e ) =>{  //will set the input value
       setState({...state,[e.target.name]:e.target.value})
    }
    // console.log(state)
    const handleSubmit= ( e ) =>{
        e.preventDefault()
 
       
       let result = validate() //validate function will be called to check whether the entered inputs are correct or not and will return a boolean

        if(result === false)return //if validate function will reyirn false then we'll simply show the alert and will return 

        setShow(true) //after filling correct data we need to show the graph so we are making show as true
        setState({
            name:'',
            email:''
        })

        let currentDate = new Date() // will access the current time and will be sent to the server
        let hours = currentDate.getHours() 
        let mins = currentDate.getMinutes() 
        
        getGraphData(hours,mins) //this function will make the api call to server and will fetch the data 
    }
   

    async function getGraphData( hrs,mns ){
        // console.log(hrs,mns)
     try {
        let res = await fetch('https://exchangerate-backend.herokuapp.com/getrates',{ 
            method:"POST",
            body: JSON.stringify({
              hrs,mns
            }),
            headers:{
              "Content-Type" : "application/json"
            }
        })
        let data = await res.json()
        // console.log(data)
        setData(data)


        let obj = data.rates
        let arr = []

      for(let key in obj){ // here we'll filter the graph data that we want to show in the bar graph
        if(key === 'INR' || key === 'CNY' || key === 'GBP' || key === 'BDT' || key === 'SAR'){
            arr.push({
                name:key,
                rate:obj[key]
            })
        }
      }
      setGraphData(arr)

     } catch (error) {
        console.log(error)
     }
    }


    function validate ( ){  //will use the regex to check the inputs are correct or not
        let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let nameregex = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/;
        let name = (nameregex.test(state.name))
        let email = (res.test(state.email))

        setNameError(name)
        setEmailError(email)
        // console.log(name,email)
        return name && email //based on the validation will return a boolean value
    }
    // console.log(data)

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

       {nameError ? '' : <p className='errorAlert'>Enter Valid name</p> }
        <br/><br />

        <label >Enter Your Email</label><br />

        <input type="email" 
        autoComplete='off'
        name='email'
        onChange={handleChange}
        value={state.email}
        className='inputfield'/><br/>

        {emailError ? '' : <p className='errorAlert'>Enter Valid Email</p> }

        <input type="submit"
        className='submitButton' />

    </form>
    {show ? <Graph graph = {graphData}/> : ''}
    <div className="clickTime">
        
        <div className="timeBox">
        {
           !data ? '' : 
           data.oldHour === 0 ?<h3>Last Click was made Just now</h3> :
           data.hour-data.oldHour === 1 ? <h3>Last Click was made {` ${60-data.oldMinute+data.minutes} minutes ago`}</h3> :
           data.hour-data.oldHour > 1  ? <h3>Last Click was made {` ${data.hour-data.oldHour} hour ago`}</h3> : 
           <h3>Last Click was made {` ${data.minutes - data.oldMinute} minutes ago`}</h3>
        }
        </div>
        </div>
    </>
  )
}

export default Form