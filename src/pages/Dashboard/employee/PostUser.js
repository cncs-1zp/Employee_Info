import { useState } from "react";
import "./PostUser.css";

const PostUser = () => {
  // State for storing form data
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

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      // Post formData to the backend endpoint
      const response = await fetch("http://localhost:8080/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Employee posted successfully:", data);
        // Optionally clear the form or give user feedback here
      } else {
        console.error("Error posting employee:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="post-user-container">
      <h2>Post User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input 
            type="text" 
            id="phone" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input 
            type="text" 
            id="department" 
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter your department" 
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostUser;
