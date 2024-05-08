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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter tasks when search query changes
    const filtered = tasks.filter(task =>
      task.suppliername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.productname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const fetchData = async () => {
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      const fetchedSuppliers = await getsupplier();
      setSuppliers(fetchedSuppliers);
      const fetchedProducts = await getproducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch data:", error);
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

  const handlePDFGenerate = () => {
    const doc = new jsPDF();

    // Bootstrap-like styles
    const styles = {
      title: {
        fontSize: 20,
        fontWeight: "bold",
        margin: [10, 10], // Top and left margins
      },
      tableHeader: {
        fontSize: 12,
        fontWeight: "bold",
        textColor: "#ffffff", // White text color for headers
        fillColor: "#007bff", // Bootstrap primary color for background
      },
      tableRow: {
        fontSize: 10,
      },
    };

    doc.setFont("helvetica");

    // Title
    doc.setTextColor("#000000"); // Black text color for title
    doc.text("Tasks", 10, 10);

    // Table headers
    const headers = ["Supplier Name", "Product Name", "Product Quantity", "Starting Date", "Expire Date"];
    const data = filteredTasks.map(task => [task.suppliername, task.productname, task.productQuantity, new Date(task.startingDate).toLocaleDateString(), new Date(task.expireDate).toLocaleDateString()]);

    doc.autoTable({
      head: [headers],
      body: data,
      theme: "grid",
      startY: 20, // Start position below the title
      styles: {
        cellPadding: 3,
        fontSize: 10,
      },
      headStyles: {
        fillColor: "#007bff",
        textColor: "#ffffff",
        fontStyle: "bold",
      },
    });

    doc.save("tasks.pdf");
  };

  // Display form
  const columns = [
    {
      title: "Supplier Name",
      dataIndex: "suppliername",
      key: "suppliername",
      render: (supplierName) => supplierName, // Render supplier name directly
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
      render: (productName) => productName, // Render product name directly
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
          onClick={handlePDFGenerate}
          style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 16px' }}
        >
          Generate PDF
        </Button>

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

        <Input
          placeholder="Search tasks"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 200 }}
        />
      </Row>

      <Table
        columns={columns}
        dataSource={filteredTasks.map((task) => ({ ...task, key: task._id }))}
        rowKey="key"
      />

      <Modal
        title={`${currentTask ? "Edit" : "Add"} Task`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="suppliername"
            label="Supplier"
            rules={[{ required: true, message: "Please select a supplier!" }]}
          >
            <Select>
              {Array.isArray(suppliers) && suppliers.map((supplier) => (
                <Select.Option key={supplier._id} value={supplier.supname}>
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
                <Select.Option key={product._id} value={product.productName}>
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

          <Button type="primary" htmlType="submit">
            {`${currentTask ? "Update" : "Add"} Task`}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskManage;
