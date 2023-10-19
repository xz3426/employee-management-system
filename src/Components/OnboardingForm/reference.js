import React from "react";
import { Space, Input, Form, Layout} from "antd";
// import { useNavigate } from "react-router-dom";
// import { FileImageTwoTone } from "@ant-design/icons";
// import { deleteProductById } from "services/products";

const { Content } = Layout;

const fields = {
  firstName: {
    placeholder: "Input fisrt name",
    name: "referFirstName",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your fisrt name!",
      },
    ],
  },

  midName: {
    placeholder: "Input mid name",
    name: "referMidName",
    type: "text",
    rules: [
      {
        required: false,
      },
    ],
  },

  lastName: {
    placeholder: "Input last name",
    name: "referLastName",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your last name!",
      },
    ],
  },

  email: {
    placeholder: "Input your email",
    name: "referEmail",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please enter your last name!",
      },

      {
        type: "email",
        message: "Invalid email format!",
        validateTrigger: "onBlur", // Validate onBlur
      },
    ],
  },

  cellPhone: {
    placeholder: "Input cell phone number",
    name: "referCellPhone",
    type: "number",
    rules: [
      {
        required: true,
        message: "Please enter your cell phone number!",
      },
    ],
  },


  relationship: {
    placeholder: "Explain the relationship",
    name: "referRelationship",
    type: "text",
    rules: [
      {
        required: true,
        message: "Please explain the relationship",
      },
    ],
  },

};


const ReferenceForm = (
// {
//   buttonText,
//   onSubmit,
//   product,
//   titleText,
//   isEdit = false,
// }
) => {

  return (
    <Content>
        <h3>Reference Information</h3>
      <div style={{ backgroundColor: "#f5f3f38f", padding: "10px 10px"}}>
        {/* <div style={container}> */}
          <Form layout="vertical" autoComplete="off">
            <Space size="large">
              <Form.Item
                key={fields.firstName.name}
                name={fields.firstName.name}
                label="First Name"
                rules={fields.firstName.rules}
                // initialValue={product?.productName}
              >
                <Input
                // style={{ width: "100%" }}
                // placeholder={fields.productName.placeholder}
                />
              </Form.Item>

              <Form.Item
                key={fields.midName.name}
                name={fields.midName.name}
                label="Mid Name"
                rules={fields.midName.rules}
                // initialValue={product?.productName}
              >
                <Input
                // style={{ width: "100%" }}
                // placeholder={fields.productName.placeholder}
                />
              </Form.Item>

              <Form.Item
                key={fields.lastName.name}
                name={fields.lastName.name}
                label="Last Name"
                rules={fields.lastName.rules}
                // initialValue={product?.productName}
              >
                <Input
                // style={{ width: "100%" }}
                // placeholder={fields.productName.placeholder}
                />
              </Form.Item>
            </Space>


            <Space size="large">
            <Form.Item
                key={fields.cellPhone.name}
                name={fields.cellPhone.name}
                label="Cell Phone Number"
                rules={fields.cellPhone.rules}
                // initialValue={product?.productName}
              >
                <Input
                style={{ width: "100%" }}
                // placeholder={fields.productName.placeholder}
                />
              </Form.Item>

              <Form.Item
                key={fields.email.name}
                name={fields.email.name}
                label="Email"
                rules={fields.email.rules}
                // initialValue={product?.productName}
              >
                <Input
                style={{ width: "100%" }}
                // placeholder={fields.productName.placeholder}
                />
              </Form.Item>
            </Space>


            <Form.Item
              key={fields.relationship.name}
              name={fields.relationship.name}
              label="Relationship"
              rules={fields.relationship.rules}
            //   initialValue={product?.description}
            >
              <Input

                placeholder={fields.relationship.placeholder}
                // value={product?.description}
              />
            </Form.Item>

          </Form>
        </div>
      {/* </div> */}
    </Content>
  );
};

export default ReferenceForm;
