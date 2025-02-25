import './UpdateUser.css';
import React, { useEffect, useState } from "react";
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Fetch employee data on component mount or when id changes
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/employee/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee");
        }
        const data = await response.json();
        console.log("Fetched employee data:", data);
        setFormData(data);
      } catch (error) {
        console.log("Error fetching user:", error.message);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form submission for updating employee using PATCH
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      console.log("Employee updated successfully!");
      navigate("/"); // Redirect back to the Dashboard after update
    } catch (error) {
      console.log("Error updating user:", error.message);
    }
  };

  return (
    <Container className="post-user-container">
      <h2>Edit Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label>Name:</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name" 
            required
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email" 
            required
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Phone:</Form.Label>
          <Form.Control 
            type="text" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number" 
            required
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Department:</Form.Label>
          <Form.Control 
            type="text" 
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter your department" 
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Edit Employee
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateUser;
