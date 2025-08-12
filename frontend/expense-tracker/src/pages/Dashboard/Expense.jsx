import React,{useEffect} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useState } from 'react'
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths"; 
import Modal from '../../components/layouts/Modal';
import ExpenseOverView from '../../components/Expense/ExpenseOverView';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { toast } from 'react-toastify';

const Expense = () => {
  useUserAuth();
  const [expenseData,setExpenseData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [openDeleteAlert,setopenDeleteAlert] = useState({
      show: false,
      data: null,
  });
  
    const [openAddExpenseModal,setOpenAddExpenseModal] = useState(false);


// Get All Expense Details
const fetchExpenseDetails = async () => {
if (loading) return;
setLoading (true);
try {
const response = await axiosInstance.get(
`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
);
if (response.data) {
setExpenseData (response.data);
}
}
catch (error) {
console. log ("Something went wrong. Please try again.", error)
} finally {
setLoading (false);
}
};


//Handle Add Expense
const handleAddExpense = async (expense) => {
  const {category,amount,date,icon} = expense;

  //Validation Checks
  if(!category.trim()){
    toast.error("Category is required");
    return;
  }

   if(!amount || isNaN(amount) || Number(amount)<=0){
    toast.error("Amount should be a valid number greater than 0");
    return;
  }

   if(!date){
    toast.error("Date is required");
    return;
  }


  try{

    await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE,{
      category,
      amount,
      date,
      icon
    });

     setOpenAddExpenseModal(false); 
     toast.success("Expense added successfully");
     fetchExpenseDetails(); 
  }

  catch(error){
    console.error("Error adding expense:",
      error.response?.data?.message || error.message
    );
  }


};


// Delete Expense
const DeleteExpense = async (id) => {
try {
await axiosInstance.delete(
`${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`
);
setopenDeleteAlert({show:false,data:null});
toast.success("Expense Details Deleted successfully");
fetchExpenseDetails();
}
catch (error) {
console.error("Error deleting expense:",
  error.response?.data?.message || error.message
);
} 
};

// //Handle download Expense Details
const handleDownloadExpenseDetails = async () => {
  try{
    const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{
      responseType:"blob",
    }
  );

  //create url for blob
  const url = window.URL.createObjectURL(new Blob ([response.data]));
  const link = document.createElement("a");
  link.href=url;
  link.setAttribute("download","expense_details.xlsx");
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
  }
  catch(error){
    console.error("Error downloading expense details",error);
    toast.error("Failed to download expense details");

  }
};

useEffect(() =>{
  fetchExpenseDetails();
  return () =>{};
},[]);


  return (
     <DashboardLayout activeMenu='Expense'>
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
        <div className=''>
        <ExpenseOverView
         transactions={expenseData}
         onAddExpense = {() => setOpenAddExpenseModal(true)}
         />
      </div>

      <ExpenseList 
       transactions={expenseData}
         onDelete = {(id)=>{
          setopenDeleteAlert({show:true,data:id});
         }}
         onDownload={handleDownloadExpenseDetails}
      />
      </div>


      <Modal 
      isOpen = {openAddExpenseModal}
      onClose = {()=>setOpenAddExpenseModal(false)}
      title="Add Expense"
      >
      <AddExpenseForm onAddExpense={handleAddExpense}/>
      </Modal>

      <Modal
      isOpen = {openDeleteAlert.show}
      onClose = {()=>setopenDeleteAlert({show:false,data:null})}
      title="Delete Expense"
      >
      <DeleteAlert 
      content ="Are you sur eyou want to delete this expense details?"
      onDelete={()=>DeleteExpense(openDeleteAlert.data)}/>
      </Modal>


      </div>
      </DashboardLayout>
  )
}

export default Expense