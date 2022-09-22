import { Button, Form, Input, message, Modal} from "antd";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "../../styles/products.css";
import { Products } from "../../Global/constants";
import axios from "axios";
import { environment } from "../../environments";
import ProductList from "./ProductList";

export default function Product() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editDetails, setEditDetails] = useState(Object);
  const [imageUrl,setImageUrl] = useState<any>()
  const showModal = () => {
    setIsModalOpen(true);
  };

  const getEditProduct = (data: any) => {
    setIsModalOpen(true);
    setEditDetails(data);
    form.setFieldsValue({
      productName: data.productName,
      productDescription: data.productDescription,
      productType: data.productType,
      price: data.price,
    });
    setIsEditingMode(true);
    setImageUrl(data.image)
  };

  // let navigate = useNavigate();

  useEffect(() => {
    const token: any = localStorage.getItem("access-token");
    setAccessToken(token);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditingMode(false);
    setImageUrl('')
    form.resetFields();
  };
  const submit = (formValues: any) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    if (!isEditingMode) {
      formValues.image = imageUrl;
      try {
        axios
          .post(environment.baseUrl + "add-product", formValues, {
            headers: headers,
          })
          .then((response) => {
            message.success("Product added successfully");
            setIsModalOpen(false);
            setImageUrl('')
            form.resetFields();
          })
          .catch((err) => {
            message.error(err.response.data.error);
          });
      } catch (error: any) {
        form.resetFields();
        console.log(error);
      }
    } else {
      axios
        .put(
          environment.baseUrl + "update-product/" + editDetails._id,
          formValues,
          {
            headers: headers,
          }
        )
        .then((response) => {
          message.success("Product updated successfully");
          setIsModalOpen(false);
          setIsEditingMode(false);
          setImageUrl('')
          form.resetFields();
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  };

  const fileChangeEvent = ((event:any)=>{
   const file = event.target.files[0];
   const reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = (_event)=>{
    setImageUrl(reader.result)
   }
  
  })
  return (
    <div>
      <Navbar />
      <div className="addButton">
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>
      <Modal
        title={!isEditingMode ? "Add Product" : "Edit Product"}
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
          form={form}
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
            <Input type="number" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <input type={"file"} onChange={fileChangeEvent} accept={"image/*"} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {isEditingMode ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
        {imageUrl && (
          <div style={{paddingLeft:"8rem"}}>
          <img src={imageUrl} width="150" height="150" alt="prod"></img>
        </div>
        )}
        
      </Modal>
      <ProductList onEdit={getEditProduct} />
    </div>
  );
}
