import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Row, Table, Popover, Form } from "react-bootstrap";
import { getTasks, createTask, updateTask, deleteTask } from '../../stores/task/taskStore'; 
import { getproducts } from '../../stores/task/productStore';
import { getsupplier } from '../../stores/task/supplierStore';
import * as yup from "yup";

// Validation schema
const taskSchema = yup.object().shape({
  supplierId: yup.string().required("Supplier is required"),
  productId: yup.string().required("Product is required"),
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
  const [formData, setFormData] = useState({
    supplierId: "",
    productId: "",
    productQuantity: "",
    startingDate: "",
    expireDate: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

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
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const isValid = await taskSchema.validate(formData);
      if (currentTask) {
        await updateTask(currentTask._id, formData);
      } else {
        await createTask(formData);
      }
      fetchData(); // Refresh the data
      setIsModalVisible(false);
      alert(`Task ${currentTask ? "updated" : "added"} successfully`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchData(); // Refresh the data
    alert("Task deleted successfully");
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setFormData({
      supplierId: task.supplierId,
      productId: task.productId,
      productQuantity: task.productQuantity,
      startingDate: task.startingDate.split("T")[0],
      expireDate: task.expireDate.split("T")[0]
    });
    setIsModalVisible(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const columns = [
    {
      title: "Supplier ID",
      dataIndex: "supplierId",
      key: "supplierId",
      render: (supplier) => supplier.name,
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
      render: (product) => product.productName,
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
          <Button variant="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popover
            id="popover-basic"
            title="Are you sure to delete this task?"
            trigger="click"
          >
            <Button variant="danger" onClick={() => handleDelete(record._id)}>
              Delete
            </Button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <Row className="mb-3">
        <h2>Tasks</h2>
        <Button onClick={() => {
            setCurrentTask(null);
            setIsModalVisible(true);
          }}>
          Create Task
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={tasks.map((task) => ({ ...task, key: task._id }))}
        rowKey="key"
      />
      <Modal
        title={`${currentTask ? "Edit" : "Add"} Task`}
        show={isModalVisible}
        onHide={() => setIsModalVisible(false)}
        animation={false}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="supplierId">
            <Form.Label>Supplier</Form.Label>
            <Form.Control as="select" name="supplierId" value={formData.supplierId} onChange={handleInputChange}>
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier._id} value={supplier._id}>
                  {supplier.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="productId">
            <Form.Label>Product</Form.Label>
            <Form.Control as="select" name="productId" value={formData.productId} onChange={handleInputChange}>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.productName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="productQuantity">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control type="number" name="productQuantity" value={formData.productQuantity} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="startingDate">
            <Form.Label>Starting Date</Form.Label>
            <Form.Control type="date" name="startingDate" value={formData.startingDate} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="expireDate">
            <Form.Label>Expire Date</Form.Label>
            <Form.Control type="date" name="expireDate" value={formData.expireDate} onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskManage;
