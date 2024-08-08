import React from "react";
import { Button, Form, Input, Space } from "antd";

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = React.useState(false);
  
    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          },
        );
    }, [values]);
    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        Submit
      </Button>
    );
  };

function UserInfo() {
    const [form] = Form.useForm();

  return (
    <div className="">
      <h4>Please tell us about yourself</h4>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} />
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserInfo;
