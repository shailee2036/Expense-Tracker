import React, { useState,useEffect } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from "../Charts/CustomLineChart"
import { LuPlus } from 'react-icons/lu'

const ExpenseOverView = ({transactions, onAddExpense}) => {

     const [chartData,setChartData] = useState([])
    
        useEffect(()=>{
            const result = prepareExpenseLineChartData(transactions);
            setChartData(result);
    
            return () =>{};
        },[transactions]);


  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>Track your spendings and analyse your 
                    expense trends</p>
            </div>

             <button className='add-btn' onClick={onAddExpense}>
                Add Expense<LuPlus className='text-lg'/>
             </button>
        </div>

        <div className='mt-10'>
            <CustomLineChart data={chartData}/>
        </div>
    </div>
  )
}

export default ExpenseOverView