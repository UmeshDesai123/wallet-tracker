import React from 'react';
import './styles.css';
import { Button, Card } from 'antd';

function Cards({ openExpenseModal, openIncomeModal, income, expense, totalBalance}) {
  const resetBalance = () => {
    
  }
  return (
    <div className='cards-container'>
      <Card className='card' title={'Current Balance'}>
        <p>$ {totalBalance}</p>
        <Button onClick={resetBalance}>Reset Balance</Button>
      </Card>
      <Card className='card' title={'Total Income'}>
        <p>$ {income}</p>
        <Button onClick={openIncomeModal}>Add Income</Button>
      </Card>
      <Card className='card' title={'Total Expenses'}>
        <p>$ {expense}</p>
        <Button onClick={openExpenseModal}>Add Expense</Button>
      </Card>
    </div>
  )
}

export default Cards;