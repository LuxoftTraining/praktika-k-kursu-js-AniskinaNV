import { runUI, addEmployeeUI} from './employees/ui-all';
import {Employee} from './employees/model/Employee';

window.addEmployeeUI = addEmployeeUI;
window.addEventListener("load", runUI);

import './style.css';