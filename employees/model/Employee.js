import {Person} from './Person'

import DATA from '../employees-json';

export class Employee extends Person {
    constructor(name, surname, id, department) {
        super(name,surname,id);
        this.department = department;
    }

    static fromJSON(obj) {
        return Object.assign(new Employee(), obj)
    }

    bonus()  {
        return new Promise(resolve=>
            setTimeout(
                ()=>resolve(Math.round(Math.random()*1000)),
                1000))

        // var bonus = Math.round(Math.random()*1000);
        // return new Promise((resolve,reject)=>
        //     setTimeout(()=>bonus<700?resolve(bonus):reject(bonus),1000))
    }


    total() {
        return new Promise((resolve,reject)=>
            this.bonus().then(bonus=> resolve(bonus + this.salary))
                .catch(bonus=> reject(bonus)))
    }

}

window.Employee = Employee;

export function jsonToEmployees(employeesJSON) {
    let employees = [];
    for (let e of employeesJSON) {
        employees.push(Employee.fromJSON(e));
    }
    return employees;
}


window.allEmployees = function() {
    return jsonToEmployees(DATA.employees);
}