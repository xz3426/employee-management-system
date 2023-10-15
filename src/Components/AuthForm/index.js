import React from 'react';
import { Button, Form, Input, Typography, Checkbox } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import styles from './style.module.css';

export default function AuthForm({
  buttonText,
  onSubmit,
  title,
  title1,
  fields,
  checkbox,
  errors
}) {
  const { status } = useSelector(state => state.user);
 

  return (
    <>
      <Typography className={styles.title}>{title}</Typography>
      {title1 && (<Typography className={styles.title1}>{title1}</Typography>)}
      <Form onFinish={onSubmit} autoComplete="off">
        {fields.map(field => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
            {field.type === 'password' ? (
              <Input.Password
                placeholder={field.placeholder}
                prefix={<LockOutlined />}
                size="large"
                style={{ height: '50px' }}
              />
            ) : (
              <Input
                placeholder={field.placeholder}
                prefix={field.prefix}
                size="large"
                style={{ height: '50px' }}
              />
            )}
          </Form.Item>
        ))}
        
        {checkbox !== undefined && 
        (
          <Form.Item
            key={checkbox.name}
            name={checkbox.name}
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox

            >
              {checkbox.text}
            </Checkbox>
          </Form.Item>
        )
       }

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.btn}
            size="large"
            loading={status === 'pending'}
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
