import React from 'react'
import {ResponsiveContainer,Line,LineChart,XAxis,YAxis,
    CartesianGrid,Legend,Tooltip,BarChart,Bar} from 'recharts'
import './form.css'
const Graph = ({graph}) => {

    
  return (
    <>
    <div className='GraphContainer'>
        <ResponsiveContainer  width='100%' aspect={2}>
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
    
    </>
  )
}

export default Graph