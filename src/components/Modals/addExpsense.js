import { useForm } from 'antd/es/form/Form';
import React from 'react'
import { DatePicker, Form, Modal, Select } from 'antd';
import './modal.css';

function AddExpsenseModal({ showExpenseModal, cancelExpenseModal, saveTransaction }) {

  const [form] = useForm();
  return (
    <Modal
      title={'Add Expense'}
      open={showExpenseModal}
      onCancel={cancelExpenseModal}
    // onOk={saveExpense}
      footer={null}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={(values) => {
          // values.date = values.date.toISOString().slice(0, 10);
          saveTransaction(values, "expense");
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
                value: 'food',
                label: 'Food',
              },
              {
                value: 'education',
                label: 'Education',
              },
              {
                value: 'travelling',
                label: 'Travelling',
              },
              {
                value: 'clothes',
                label: 'Clothes',
              },
              {
                value: 'medical',
                label: 'Medical',
              },
              {
                value: 'entertainment',
                label: 'Entertainment',
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

export default AddExpsenseModal;