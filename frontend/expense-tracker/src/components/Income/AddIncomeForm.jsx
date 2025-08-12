import React,{useState} from 'react'
import Input from "../Inputs/Input"
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddIncomeForm = ({onAddIncome}) => {

const [income,setIncome] = useState({
    source:"",
    amount:"",
    date:"",
    icon:""

});

const handleChange = ({ key, value }) => {
  setIncome({ ...income, [key]: value });
};
  return (
    <div>

    <EmojiPickerPopup 
    icon={income.icon}
    onSelect = {(selectedIcon) => handleChange({ key: "icon", value: selectedIcon })}/>

    <Input 
    value={income.source}
    onChange={({target}) => handleChange({ key: "source", value: target.value })}
    label="Income Source"
    placeholder="Freelance,Salary,etc"
    type="text"/>

    <Input value={income.amount}
    onChange={({target}) => handleChange({key:"amount",value:target.value})}
    label="Amount"
    placeholder=""
    type="number"/>

    <Input value={income.date}
    onChange={({target}) => handleChange({key:"date",value:target.value})}
    label="Date"
    placeholder=""
    type="date"/>
    

    <div className='flex justify-end mt-6'>
        <button
        type='button'
        className='add-btn add-btn-fill'
        onClick={()=>onAddIncome(income)}>Add Income</button>
    </div>

    </div>
  )
}

export default AddIncomeForm