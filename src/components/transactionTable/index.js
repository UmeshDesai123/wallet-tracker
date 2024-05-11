import React, { useState } from 'react';
import './styles.css';
import { Table, Select, Radio, Popconfirm, Button } from 'antd';
import { unparse, parse } from 'papaparse';
import { toast } from 'react-toastify';
import { db, auth } from '../../firebase';
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

function TransactionTable({ transactions, addDocToDb, loading, setTransactions }) {
  const [user] = useAuthState(auth);
  const [serach, setSearch] = useState('');
  const [type, setType] = useState('');
  const [sortKey, setSortKey] = useState('');

  function exportToCSV() {
    const csv = unparse({
      fields: ['date', 'title', 'amount', 'type', 'tag'],
      data: transactions
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importCSV(e) {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        complete: async (results) => {
          for (const doc of results.data) {
            doc.amount = parseFloat(doc.amount);
            await addDocToDb(doc);
          }
        },
      });
      toast.success('Transactions added!');
    } catch (error) {
      console.log(error);
    }

  };

  const deleteRow = async (docId) => {
    try {
      console.log('delete', docId)
      await deleteDoc(doc(db, `users/${user.uid}/transactions`, docId));
      const newArray = transactions.filter((item) => item.docId !== docId);
      setTransactions(newArray);
      toast.success('Transaction Deleted!');
    } catch (error) {
      console.log(error);
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <a onClick={()=> deleteRow(record.docId)}>Delete</a>
        // <Popconfirm
        //   title="Delete the transaction"
        //   description="Are you sure to delete this transaction?"
        //   onConfirm={() => { deleteRow(record.docId) }}
        //   // onCancel={cancel}
        //   okText="Yes"
        //   cancelText="No"
        // >
        //   <Button danger>Delete</Button>
        // </Popconfirm>

      ),
    },
  ];

  const dataSource = transactions.filter((doc) => doc.title.toLowerCase().includes(serach.toLowerCase()) && (type === 'all' ? true : doc.type.includes(type)));

  const sortedDataSource = dataSource.sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
    else if (sortKey === 'amount') {
      return a.amount - b.amount;
    }
    else {
      return 0;
    }
  });

  return (
    <>
      <div className='search-bar'>
        <input value={serach} onChange={(e) => { setSearch(e.target.value) }} placeholder='Search by title' />
        <Select
          className='select-tag'
          placeholder="Select a tag"
          onChange={(value) => { setType(value) }}
          value={type}
          options={[
            {
              value: 'all',
              label: 'All',
            },
            {
              value: 'income',
              label: 'Income',
            },
            {
              value: 'expense',
              label: 'Expense',
            },
          ]}
        />
      </div>
      <div className='radio-group'>
        <p>My Transactions</p>
        <Radio.Group onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <Radio value={''}>No sort</Radio>
          <Radio value={'date'}>Sort by date</Radio>
          <Radio value={'amount'}>sort by amount</Radio>
        </Radio.Group>
        <div className='csv'>
          <button onClick={exportToCSV} className='btn'>Export to CSV</button>
          <label htmlFor='csv-upload'>Upload CSV</label>
          <input id='csv-upload' type='file' onChange={importCSV} />
        </div>
      </div>
      <Table loading={loading} dataSource={sortedDataSource} columns={columns} rowKey="docId" />
    </>
  )
}

export default TransactionTable;