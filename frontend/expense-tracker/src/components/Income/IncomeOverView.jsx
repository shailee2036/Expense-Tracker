import React, { useState,useEffect } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper'
import CustomBarChart from "../Charts/CustomBarChart"
import { LuPlus } from 'react-icons/lu'

const IncomeOverView = ({transactions, onAddIncome}) => {
    const [chartData,setChartData] = useState([])

    useEffect(()=>{
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () =>{};
    },[transactions]);
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your earning and analyze your income trends</p>
            </div>

             <button className='add-btn' onClick={onAddIncome}>
                Add Income<LuPlus className='text-lg'/>
             </button>
        </div>

        <div className='mt-10'>
            <CustomBarChart data={chartData}/>
        </div>
    </div>
  )
}

export default IncomeOverView