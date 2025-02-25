package com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.entity.Employee;
import com.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {

	private final EmployeeRepository employeeRepository;

	public Employee postEmployee(Employee employee) {
		return employeeRepository.save(employee);
	}

	public List<Employee> getAllEmployee() {
		return employeeRepository.findAll();
	}

	public Employee getEmployeeById(Long id) {
		return employeeRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Employee not found with id: " + id));
	}

	public void deleteEmployee(Long id) {
		if (!employeeRepository.existsById(id)) {
			throw new EntityNotFoundException("Employee with id" + id + "Not Found");
		}
		employeeRepository.deleteById(id);
	}
	public Employee UpdateEmployee(Long id,Employee employee) {
		Optional<Employee>OptionalEmployee=employeeRepository.findById(id);
		if(OptionalEmployee.isPresent()) {
			Employee existingEmployee=OptionalEmployee.get();
			
			existingEmployee.setEmail(employee.getEmail());
			existingEmployee.setName(employee.getName());
			existingEmployee.setPhone(employee.getPhone());
			existingEmployee.setDepartment(employee.getDepartment());
			return employeeRepository.save(existingEmployee);
			
		}
		return null;
	}
}
