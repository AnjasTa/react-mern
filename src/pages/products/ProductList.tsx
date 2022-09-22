import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { environment } from "../../environments";
import { alertMessages, Products } from "../../Global/constants";
import "../../styles/productList.css";
// import axios from "../../configuration/config"

interface DataType {
  key: string;
  productName: string;
  productDescription: string;
  productType: string;
  price: number;
  image : string;
}

export default function ProductList(props:any) {
  const [product, SetProduct] = useState<DataType[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .get(environment.baseUrl + "get-product", { headers: headers })
      .then((result: any) => {
        SetProduct(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props]);
  const columns: ColumnsType<DataType> = [
    {
      title : "Image",
      dataIndex:"image",
      key:"image",
      render: (_, record) => (
        <img src={record.image} width="100" height="50"/>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>editProduct(record)}>Edit</Button>
          <Popconfirm title={alertMessages.warn.delete} onConfirm={() => deleteProduct(record)}>
          <Button type="primary" danger >
            Delete
          </Button>
          </Popconfirm>
          
        </Space>
      ),
    },
  ];

  const editProduct = (product:any)=>{
    props.onEdit(product)
  }

  const deleteProduct = (prod: any) => {
    const token: any = localStorage.getItem("access-token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .delete(environment.baseUrl + "delete-product/" + prod._id, {
        headers: headers,
      })
      .then((response: any) => {
        const array:any = []
        product.map((product: any) => {
          if (product._id !== response.data.results._id) {
            array.push(product)
          }
          return product;
        });
        SetProduct(()=>array)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <h3 className="productTitle">Products</h3>
      </div>
      <Table
        columns={columns}
        dataSource={product}
        style={{ paddingTop: "2rem" }}
      />
    </>
  );
}
