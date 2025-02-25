import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete=async(employeeId)=>{
    try{
      const response=await fetch(`http://localhost:8080/api/employee/${employeeId}`,{
        method:"DELETE",
      });
      console.log('Employee with ID ${employeeId} deleted successfully')
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    }
    catch(error){
      console.log("Error deleting employee:",error.message);
    }

  }
  const handleUpdate=(employeeId)=>{
    navigate(`employee/${employeeId}`);
  }

  return (
    <>
      <Container className="mt-5">
        {/* Dashboard Header Card */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="text-center">Employee Dashboard</Card.Title>
                <Card.Text className="text-center">
                  Manage your employees efficiently and professionally.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Employee Table */}
        <Row>
          <Col>
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                      <td>{employee.department}</td>
                      <td>
                        <Button variant="outline-secondary" onClick={()=>handleUpdate(employee.id)} size="sm" className="me-2">
                          Update
                        </Button>
                        <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)} size="sm">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
