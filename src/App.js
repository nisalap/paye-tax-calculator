import './App.css';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import IncomeTaxTable from './incomeTax';
import * as React from 'react';

function currencyFormat(num) {
  num = num.toString();
  return '' + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function App() {

  // Initializing all the state variables
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyIncomeInt, setMonthlyIncomeInt] = useState(0);
  const [monthlyIncomeString, setMonthlyIncomeString] = useState("");

  useEffect(() => {
    let monNum = monthlyIncome.replace(/\D/g, '');
    setMonthlyIncomeInt(parseInt(monNum));
    setMonthlyIncomeString(currencyFormat(monNum));
  }, [monthlyIncome]);


  return (
    <div className='App'>
      <h3> Income Tax Calculator (LKR) - 2022</h3>
      <p/>
      <TextField 
                id="input-monthly-income" 
                type="currency" 
                placeholder="0" 
                label="Monthly Income"
                value={monthlyIncomeString}
                onChange={(e) => setMonthlyIncome(e.target.value)}/>
      <IncomeTaxTable monthlyIncome={monthlyIncomeInt}/>
      <p><a href="https://economynext.com/wp-content/uploads/2022/10/275-2022_inland-revenue.pdf">Check the Gazette here!</a></p>
      <p>A simple react app by <a href="https://nisalap.com">nisalap</a></p>
    </div>
  );   
}

export default App;
