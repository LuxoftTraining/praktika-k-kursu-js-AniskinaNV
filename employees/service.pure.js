import {Employee} from "./model/Employee";

export function removeEmployee(employees, id) {
    return employees.filter(e=>e.id!==id);
}

export function addEmployee(employees, name, surname) {
    let id=employees.map(e=>e.id).reduce((x,y)=>Math.max(x,y))+1;
    return [...employees, new Employee(name,surname,id)];
}

function addPhone(employees, id, phone) {
    let newEmployee = employees.filter(e=>e.id===id);
    if(!newEmployee){
        return employees;
    }
    newEmployee.phones.push(phone);
    return [...removeEmployee(employees, id),newEmployee];
}

function setDateOfBirth(employees, id, date) {
    let newEmployee = employees.filter(e=>e.id===id);
    if(!newEmployee){
        return employees;
    }
    newEmployee.dateOfBirth=new Date(date);
    return [...removeEmployee(employees, id),newEmployee];
}

export function setEmployeeManager(employees, id, managerId){
    let newEmployee = employees.filter(e=>e.id===id);
    if(!newEmployee){
        return employees;
    }
    newEmployee.managerRef =managerId;
    return [...removeEmployee(employees, id),newEmployee];
}