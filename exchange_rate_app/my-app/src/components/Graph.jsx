import React from 'react'
import {ResponsiveContainer,Line,LineChart,XAxis,YAxis,
    CartesianGrid,Legend,Tooltip,BarChart,Bar} from 'recharts'
import './form.css'
const Graph = () => {
    const graph = [
        {name:"AED",rate:5},
        {name:"AFN",rate:10},
        {name:"ALL",rate:7},
        {name:"AMD",rate:6},
        {name:"ANG",rate:9}
    ]
    let currentDate = new Date()
    let hours = currentDate.getHours() 
    let mins = currentDate.getMinutes() 
   console.log(hours)
  return (
    <>
    <div style={{display:'flex',justifyContent:"center"}}>
        <ResponsiveContainer  width='50%' aspect={3}>
            <BarChart width={730} height={250} data={graph} margin={{ top: 15, right: 15, bottom: 15, left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rate" fill="#25A834" />
            </BarChart>
        </ResponsiveContainer>

    </div>
        <div className="clickTime">
        
        <div className="timeBox">
        {hours < 10 ? <h3 >{`Last Click was made at 0${hours}:`} </h3> : <h3 >{`Last Click was made at ${hours}:`} </h3>}
        {mins < 10 ? <h3 >{` 0${mins}`} </h3> : <h3 >{` ${mins}`} </h3>}
        </div>
        </div>
    </>
  )
}

export default Graph