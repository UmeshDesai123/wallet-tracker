import React from 'react';
import { Line } from '@ant-design/charts';
import './styles.css';

function ChartComponent({ transactions }) {
  let currentBal = 0;
  const data = transactions.map((doc) => {
    if (doc.type === 'income') {
      currentBal += doc.amount;
    }
    else {
      currentBal -= doc.amount;
    }
    return {
      date: doc.date,
      "Current Balance": currentBal
    }
  });

  const config = {
    data,
    with: 1700,
    xField: 'date',
    yField: 'Current Balance',
  };
  return (
    <div className='line'>
      <h3>Your Analytics</h3>
      <Line {...config}
      // onReady={(chartInstance) => {chart = chartInstance}}
       />
    </div>
  )
}


export default ChartComponent;