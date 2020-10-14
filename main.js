import { runUI, addEmployeeUI, removeEmployeeUI} from './employees/ui-all';
import {Employee} from './employees/model/Employee';
import './style.css';
import DATA from "./employees/employees-json";

window.addEmployeeUI = addEmployeeUI;
window.addEventListener("load", runUI);
window.currentEmployees=DATA.employees;
window.removeEmployeeUI = removeEmployeeUI;




