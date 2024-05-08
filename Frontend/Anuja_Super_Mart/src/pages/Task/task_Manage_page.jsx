import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Table,
  Popconfirm,
  notification,
} from "antd";
import "antd/dist/reset.css";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../stores/task/taskStore"; // Ensure these are implemented
import { getproducts } from "../../stores/task/productStore";
import { getsupplier } from "../../stores/task/supplierStore";
import Title from "antd/es/typography/Title";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import * as yup from "yup";


const { Option } = Select;

// Validation schema
const taskSchema = yup.object().shape({
  suppliername: yup.string().required("Supplier is required"),
  productname: yup.string().required("Product is required"),
  productQuantity: yup
    .number()
    .typeError("Must be a number")
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  startingDate: yup.date().required("Starting date is required"),
  expireDate: yup
    .date()
    .required("Expire date is required")
    .min(yup.ref("startingDate"), "Expire date can't be before start date"),
});

function TaskManage() {
  const [tasks, setTasks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // Used for edit
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      const fetchedSuppliers = await getsupplier();
      setSuppliers(fetchedSuppliers);
      const products = await getproducts();
      setProducts(products);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Add or edit task based on currentTask state
  const handleSubmit = async (values) => {
    try {
      const isValid = await taskSchema.validate(values);
      if (currentTask) {
        await updateTask(currentTask._id, values);
      } else {
        await createTask(values);
      }
      fetchData(); // Refresh the data
      setIsModalVisible(false);
      notification.success({
        message: `Task ${currentTask ? "updated" : "added"} successfully`,
      });
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchData(); // Refresh the data
    notification.success({ message: "Task deleted successfully" });
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    form.setFieldsValue({
      ...task,
      startingDate: task.startingDate.split("T")[0],
      expireDate: task.expireDate.split("T")[0],
    });
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Supplier Name",
      dataIndex: "supplierId",
      key: "supplierId",
      render: (supplier) => supplier?.suppliername,
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      render: (product) => product?.productname,
    },
    {
      title: "Product Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Starting Date",
      dataIndex: "startingDate",
      key: "startingDate",
      render: (text) => new Date(text).toLocaleDateString(), // Format the date
    },
    {
      title: "Expire Date",
      dataIndex: "expireDate",
      key: "expireDate",
      render: (text) => new Date(text).toLocaleDateString(), // Format the date
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ margin: "20px" }}>
      <Row justify={"space-between"}>
        <img src="logo.png" alt="Logo" style={{ margin: '10px', padding: '5px' }} />
        <Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>Tasks</Title>




        <Button
          onClick={() => {
            setCurrentTask(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
          style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px' }}
        >
          Create Task
        </Button>

      </Row>
      <Table
        columns={columns}
        dataSource={Array.isArray(tasks) ? tasks.map((task) => ({ ...task, key: task._id })) : []}
        rowKey="key"
      />

      <Modal
        title={`${currentTask ? "Edit" : "Add"} Task`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="suppliername"
            label="Supplier"
            rules={[{ required: true, message: "Please select a supplier!" }]}
          >
            <Select>
              {Array.isArray(suppliers) && suppliers.map((supplier) => (
                <Select.Option key={supplier._id} value={supplier._id}>
                  {supplier.supname}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="productname"
            label="Product"
            rules={[{ required: true, message: "Please select a product!" }]}
          >
            <Select>
              {Array.isArray(products) && products.map((product) => (
                <Select.Option key={product._id} value={product._id}>
                  {product.productName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="productQuantity"
            label="Product Quantity"
            rules={[
              { required: true, message: "Please input the product quantity!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="startingDate"
            label="Starting Date"
            rules={[
              { required: true, message: "Please input the starting date!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="expireDate"
            label="Expire Date"
            rules={[
              { required: true, message: "Please input the expire date!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskManage;