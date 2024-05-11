import React from 'react';
import { Pie } from '@ant-design/charts';
import './styles.css';

const PieChart = ({ transactions, loading }) => {
  const mapd = {}
  for(const doc of transactions ?? []){
    if(doc?.type === 'expense'){
      if(mapd[doc.tag]){
      mapd[doc.tag] += doc.amount;
      }
      mapd[doc.tag] = doc.amount;
    }
  }

  const data = Object.keys(mapd).map((key) => ({
    type: key,
    value: mapd[key],
  }));
  // console.log(data);

  const data1 = [
    { type: 'Category 1', value: 27 },
    { type: 'Category 2', value: 25 },
    { type: 'Category 3', value: 18 },
    { type: 'Category 4', value: 15 },
    { type: 'Category 5', value: 10 },
  ];

  const config = {
    // appendPadding: 10,
    
    data: data,
    width: 400,
    angleField: 'value',
    colorField: 'type',
    // radius: 0.8,
    // label: {
    //   type: 'inner',
    //   offset: '-30%',
    //   content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    //   style: {
    //     fontSize: 14,
    //     textAlign: 'center',
    //   },
    // },
    // interactions: [
    //   {
    //     type: 'element-active',
    //   },
    // ],
  };

  return (
    <div className='pie'>
      <h3>Your Expenses</h3>
      <Pie {...config} 
      // onReady={(chartInstance) => {chart = chartInstance}}
      />
    </div>
    
    );
};

export default PieChart;