// Abstract Employee class
class Employee {
    isPayday() {
      throw new Error('isPayday() must be implemented by subclass');
    }
  
    calculatePay() {
      throw new Error('calculatePay() must be implemented by subclass');
    }
  
    deliverPay(pay) {
      throw new Error('deliverPay() must be implemented by subclass');
    }
  }
  
  // Employee types
  const EmployeeType = {
    COMMISSIONED: 'COMMISSIONED',
    HOURLY: 'HOURLY',
    SALARIED: 'SALARIED'
  };
  
  // CommissionedEmployee class
  class CommissionedEmployee extends Employee {
    constructor(employeeRecord) {
      super();
      this.employeeRecord = employeeRecord;
    }
  
    isPayday() {
      // Implement specific logic for commissioned employees
    }
  
    calculatePay() {
      // Implement specific logic for commissioned employees
    }
  
    deliverPay(pay) {
      // Implement specific logic for commissioned employees
    }
  }
  
  // HourlyEmployee class
  class HourlyEmployee extends Employee {
    constructor(employeeRecord) {
      super();
      this.employeeRecord = employeeRecord;
    }
  
    isPayday() {
      // Implement specific logic for hourly employees
    }
  
    calculatePay() {
      // Implement specific logic for hourly employees
    }
  
    deliverPay(pay) {
      // Implement specific logic for hourly employees
    }
  }
  
  // SalariedEmployee class
  class SalariedEmployee extends Employee {
    constructor(employeeRecord) {
      super();
      this.employeeRecord = employeeRecord;
    }
  
    isPayday() {
      // Implement specific logic for salaried employees
    }
  
    calculatePay() {
      // Implement specific logic for salaried employees
    }
  
    deliverPay(pay) {
      // Implement specific logic for salaried employees
    }
  }
  
  // EmployeeFactory interface
  class EmployeeFactory {
    makeEmployee(employeeRecord) {
      throw new Error('makeEmployee() must be implemented by subclass');
    }
  }
  
  // EmployeeFactoryImpl class
  class EmployeeFactoryImpl extends EmployeeFactory {
    makeEmployee(employeeRecord) {
      switch (employeeRecord.type) {
        case EmployeeType.COMMISSIONED:
          return new CommissionedEmployee(employeeRecord);
        case EmployeeType.HOURLY:
          return new HourlyEmployee(employeeRecord);
        case EmployeeType.SALARIED:
          return new SalariedEmployee(employeeRecord);
        default:
          throw new InvalidEmployeeType(employeeRecord.type);
      }
    }
  }
  
  // Custom Error for InvalidEmployeeType
  class InvalidEmployeeType extends Error {
    constructor(type) {
      super(`Invalid employee type: ${type}`);
      this.name = 'InvalidEmployeeType';
    }
  }
  