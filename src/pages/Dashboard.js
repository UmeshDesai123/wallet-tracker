import React, { useEffect, useState } from 'react';
import './../App.css';
import Header from '../components/Header';
import Cards from '../components/cards';
import AddExpsenseModal from '../components/Modals/addExpsense';
import AddIncomeModal from '../components/Modals/addIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import TransactionTable from '../components/transactionTable';
import ChartComponent from '../components/charts';
import PieChart from '../components/charts/pie-chart';
import { Spin } from 'antd';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const openExpenseModal = () => {
    setShowExpenseModal(true);
  }

  const cancelExpenseModal = () => {
    setShowExpenseModal(false);
  }

  const openIncomeModal = () => {
    setShowIncomeModal(true);
  }

  const cancelIncomeModal = () => {
    setShowIncomeModal(false);
  }

  const saveTransaction = (value, type) => {
    console.log(value);
    const transaction = {
      type: type,
      title: value.title,
      amount: parseFloat(value.amount),
      date: value.date.format('YYYY-MM-DD'),
      tag: value.tag
    }
    addDocToDb(transaction).then(() => toast.success('Transaction added!'));
    // setShowIncomeModal(false);
  }

  async function addDocToDb(data) {
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), data);
      // console.log('savedDoc', docRef, docRef.id);
      setTransactions([...transactions, {...data, docId: docRef.id}]);
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to add transaction');
    }
  }

  useEffect(() => {
    fetchDocs();
  }, [user]);

  async function fetchDocs() {
    try {
      setLoading(true);
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionArray = [];
        querySnapshot.forEach((doc) => {
          // console.log('docc', doc.id)
          transactionArray.push({...doc.data(), docId: doc.id});
        });
        // console.log('trans', transactionArray);
        setTransactions(transactionArray);
        toast.success('Transactions fetched');
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    calculateTotal();
  }, [transactions]);

  const calculateTotal = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((doc) => {
      if (doc.type === 'income') {
        totalIncome += doc.amount;
      }
      else {
        totalExpense += doc.amount;
      }
    });

    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalIncome - totalExpense);
  }

  return (
    <>
      <Header></Header>
      <Cards
        transactions={transactions}
        setTransactions={setTransactions}
        openExpenseModal={openExpenseModal}
        openIncomeModal={openIncomeModal}
        income={income}
        expense={expense}
        totalBalance={totalBalance}
      />
      <>
        <AddExpsenseModal
          showExpenseModal={showExpenseModal}
          cancelExpenseModal={cancelExpenseModal}
          saveTransaction={saveTransaction}
        />
        <AddIncomeModal
          showIncomeModal={showIncomeModal}
          cancelIncomeModal={cancelIncomeModal}
          saveTransaction={saveTransaction}
        />
      </>
      <div className='charts'>
        <ChartComponent transactions= {
          transactions.sort((a, b) => new Date(a.date) - new Date(b.date))}/>
        <PieChart transactions={transactions}/>      
      </div>
      <TransactionTable 
        transactions={transactions} 
        setTransactions={setTransactions}
        addDocToDb={addDocToDb} 
        fetchDocs={fetchDocs}
        loading={loading}
        />
    </>
  )
}

export default Dashboard;