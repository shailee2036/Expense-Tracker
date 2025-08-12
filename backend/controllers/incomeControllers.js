//IMporting libraries
const user = require("../models/User")
const xlsx = require('xlsx');
const Income = require("../models/Income")

//Add Income Source
// exports.addIncome = async (req, res) => {
// const userId = req.user.id;
// try{
//     const {icon,source,amount,date}=req.body;

//     //Validation:check for missing fields
//     if(!source || !amount || !date){
//         return res.status(400).json({message: "All fields are required"});
//     }
//     const newIncome = new Income({
//         userId,
//         icon,
//         source,
//         amount,
//         date: new Date(date)
//     });

//     await newIncome.save();
//     res.status(200).json(newIncome);
// }
// catch(err){
//     res.status(500).json({message: "Server Error"}); 

// }
// }

// Add Income Source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    // Validation
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if already exists for same date & source
    const existingIncome = await Income.findOne({
      userId,
      source: source.trim(),
      date: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lt: new Date(date).setHours(23, 59, 59, 999)
      }
    });

    if (existingIncome) {
      return res.status(400).json({ message: "Income already exists for this source and date" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source: source.trim(),
      amount,
      date: new Date(date)
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


//Get All Income
exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try{
    const income = await Income.find({userId}).sort({date:-1});
    res.json(income);
   }
catch(err){
    res.status(500).json({message: "Server Error"}); 
}

};

//Delete Income 
exports.deleteIncome = async (req, res) => {
try{
    await Income.findByIdAndDelete(req.params.id);
    res.json({message: "Income deleted successfully"});
   }
catch(err){
    res.status(500).json({message: "Server Error"}); 
}
}

//Prepare date for download
exports.downloadIncomeExcel = async (req, res) => {
const userId = req.user.id;
 try{
    const income = await Income.find({userId}).sort({date:-1});
    
    //Prepare data for excel
    const data = income.map((item) => ({
        Source:item.source,
        Amount:item.amount,
        Date:item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb,ws,"Income");
    xlsx.writeFile(wb, 'income_details.xlsx');
    res.download('income_details.xlsx');
   } catch(err){
    res.status(500).json({message: "Server Error"}); 
   }

}