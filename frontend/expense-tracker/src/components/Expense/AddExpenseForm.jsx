import React,{useState} from 'react'
import Input from "../Inputs/Input"
import EmojiPickerPopup from '../layouts/EmojiPickerPopup';

const AddExpenseForm = ({onAddExpense}) => {

const [expense,setExpense] = useState({
    category:"",
    amount:"",
    date:"",
    icon:""

});

const handleChange = ({ key, value }) => {
  setExpense({ ...expense, [key]: value });
};

  return (
    <div>

    <EmojiPickerPopup 
    icon={expense.icon}
    onSelect = {(selectedIcon) => handleChange({ key: "icon", value: selectedIcon })}/>

    <Input 
    value={expense.category}
    onChange={({target}) => handleChange({ key: "category", value: target.value })}
    label="Expense Category"
    placeholder="Clothing,Restaurants,etc"
    type="text"/>

    <Input value={expense.amount}
    onChange={({target}) => handleChange({key:"amount",value:target.value})}
    label="Amount"
    placeholder=""
    type="number"/>

    <Input value={expense.date}
    onChange={({target}) => handleChange({key:"date",value:target.value})}
    label="Date"
    placeholder=""
    type="date"/>
    

    <div className='flex justify-end mt-6'>
        <button
        type='button'
        className='add-btn add-btn-fill'
        onClick={()=>onAddExpense(expense)}>Add Expense</button>
    </div>

    </div>
  )
}

export default AddExpenseForm