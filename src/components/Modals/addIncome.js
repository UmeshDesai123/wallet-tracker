import React from 'react';
import { DatePicker, Form, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import './modal.css';

function AddIncomeModal({ showIncomeModal, cancelIncomeModal, saveTransaction }) {
  const [form] = useForm();

  return (
    <Modal
      title={'Add Income'}
      open={showIncomeModal}
      onCancel={cancelIncomeModal}
      // onOk={saveIncome}
      footer={null}
      >
      <Form
        form={form}
        layout='vertical'
        onFinish={(values) => {
          // values.date = values.date.toISOString().slice(0, 10);
          saveTransaction(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          style={{ fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: 'Please enter the title of the expense!',
            },
          ]}
        >
          <input type='text' className='custom-input' />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          style={{ fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: 'Please enter your Amount!',
            },
          ]}
        >
          <input type='number' className='custom-input' />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          style={{ fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: 'Please select Date!',
            },
          ]}
        >
          <DatePicker format={'YYYY-MM-DD'} className='custom-input'></DatePicker>
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[
            {
              required: true,
              message: 'Please select a tag!',
            },
          ]}
        >
          <Select
            placeholder="Select a tag"
            options={[
              {
                value: 'salary',
                label: 'Salary',
              },
              {
                value: 'freelance',
                label: 'Freelance',
              },
              {
                value: 'investment',
                label: 'Investment',
              },
              {
                value: 'other',
                label: 'Other',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
        >
          <button className='btn' type="primary" htmlType="submit">
            Ok
          </button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddIncomeModal;