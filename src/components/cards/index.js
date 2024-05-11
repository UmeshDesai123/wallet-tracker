import React from 'react';
import './styles.css';
import { Button, Card, Popconfirm } from 'antd';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

function Cards({ openExpenseModal, openIncomeModal, income, expense, totalBalance, transactions, setTransactions }) {
  const [user] = useAuthState(auth);
  const resetBalance = async () => {
    try {
      for (const trans of transactions) {
        await deleteDoc(doc(db, `users/${user.uid}/transactions`, trans.docId));
      }
      setTransactions([]);
      toast.success("Reset successful!");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='cards-container'>
      <Card className='card' title={'Current Balance'}>
        <p>$ {totalBalance}</p>
        <Popconfirm
          title="Reset Transactions"
          description="Are you sure to delete all transactions?"
          onConfirm={() => { resetBalance() }}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button>Reset Balance</Button>
        </Popconfirm>
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