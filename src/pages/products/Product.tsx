import { Button, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "../../styles/products.css";
import { Products } from "../../Global/constants";
import axios from "axios";
import { environment } from "../../environments";
import ProductList from "./ProductList";

export default function Product() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const getEditProduct = ((data:any)=>{
    console.log("incoming data",data)
  })

  // let navigate = useNavigate();

  useEffect(() => {
    const token: any = localStorage.getItem("access-token");
    setAccessToken(token);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const submit = (formValues: any) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(environment.baseUrl + "add-product", formValues, {
        headers: headers,
      })
      .then((response) => {
        message.success("Product added successfully");
        setIsModalOpen(false);
      })
      .catch((err) => {
        message.error(err);
      });
    setIsModalOpen(false);
  };
  return (
    <div>
      <Navbar />
      <div className="addButton">
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <Modal
        title="Add Product"
        open={isModalOpen}
        centered
        footer
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={submit}
        >
          <Form.Item
            label={Products.formFields.productName.label}
            name={Products.formFields.productName.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={Products.formFields.productDescription.label}
            name={Products.formFields.productDescription.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={Products.formFields.productType.label}
            name={Products.formFields.productType.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={Products.formFields.Price.label}
            name={Products.formFields.Price.name}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ProductList onEdit={getEditProduct} />
    </div>
  );
}
