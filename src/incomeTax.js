import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function currencyFormat(num) {
    num = num.toString();
    return '' + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

export default function IncomeTaxTable({monthlyIncome}) {
  let yearlyIncome = monthlyIncome > 0 ?  parseInt(monthlyIncome) * 12: 0;
  let rates = [0, 6, 12, 18, 24, 30, 36];
  let brackets = [0, 1200000, 1700000, 2200000, 2700000, 3200000, 3700000, 99999999999];
  let tax = 0;

  let salaryRows = [];


  for(let i = 0; i < rates.length; i ++) {
    if (brackets[i] <= yearlyIncome) {
        let taxable = Math.min(yearlyIncome - brackets[i] , brackets[i+1] - brackets[i])
        let curTax = (taxable * rates[i] / 100) / 12;
        let to = Math.ceil(Math.min(yearlyIncome/12, brackets[i+1]/12))
        tax += curTax;
        taxable = Math.ceil(taxable / 12);
        salaryRows.push({ to, taxable, rate: rates[i], tax: Math.ceil(curTax), total: Math.ceil(tax) });
        
    }
  }
    
  let tableHeader = <TableRow>
                        <StyledTableCell align="right">Income</StyledTableCell>
                        <StyledTableCell align="right">Taxable Income</StyledTableCell>
                        <StyledTableCell align="right">Rate (%)</StyledTableCell>
                        <StyledTableCell align="right">Tax</StyledTableCell>
                        <StyledTableCell align="right">Total Tax</StyledTableCell>
                    </TableRow>

  return (
    <div >
    <h3> Monthly Tax</h3>
    <h4>{currencyFormat(Math.ceil(tax))}</h4>
    <h3> Yearly Tax</h3>
    <h4>{currencyFormat(Math.ceil(tax* 12))}</h4>
    <h3> Yearly Income</h3>
    <h4>{currencyFormat(Math.ceil(yearlyIncome))}</h4>
    <h3> Tax Breakdown</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          {tableHeader}
        </TableHead>
        <TableBody>
          {salaryRows.map((row) => (
            <StyledTableRow key={row.from}>
              <StyledTableCell align="right">{currencyFormat(row.to)}</StyledTableCell>
              <StyledTableCell align="right">{currencyFormat(row.taxable)}</StyledTableCell>
              <StyledTableCell align="right">{row.rate}%</StyledTableCell>
              <StyledTableCell align="right">{currencyFormat(row.tax)}</StyledTableCell>
              <StyledTableCell align="right">{currencyFormat(row.total)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}