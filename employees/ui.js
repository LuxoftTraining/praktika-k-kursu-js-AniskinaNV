import { addEmployee, findById, setEmployeeManager} from './service';
import { removeEmployee} from './service.pure';
import {Employee,jsonToEmployees} from "./model/Employee";
import DATA from "./employees-json";
import * as server from './server';

const PLACEHOLDER="employeesPlaceholder";

function clearEmployeesPlaceholder() {
    document.getElementById(PLACEHOLDER).innerHTML = '';
}

async function showEmployees(employeesJSON) {
    // clearEmployeesPlaceholder();
    // const ul = document.createElement("ul");
    //
    // for (let employee of jsonToEmployees(employees))  {
    //     const li = document.createElement("li");
    //     ul.appendChild(li);
    //
    //     li.innerHTML = employee;
    //     const removeButton = document.createElement("button");
    //     removeButton.innerHTML = "Удалить";
    //     removeButton.addEventListener('click',
    //         () => removeEmployeeUI(employee.id));
    //     li.appendChild(removeButton);
    //
    //     let managerHTML = "";
    //
    //     if (employee.managerRef) {
    //         let manager = findById(employee.managerRef);
    //         const managerSpan = document.createElement("span");
    //         const managerSelect = document.createElement("select");
    //         fillSelect(managerSelect, getEmployeesOptions(), 	employee.managerRef);
    //         managerSelect.addEventListener('change', () => employee.managerRef=managerSelect.value);
    //         managerSpan.innerHTML = " <b>Руководитель:</b> ";
    //         li.appendChild(managerSpan);
    //         li.appendChild(managerSelect);
    //     }
    // }
    // document.getElementById(PLACEHOLDER).appendChild(ul);

    let employees = jsonToEmployees(employeesJSON);
    let allEmployees = await server.getEmployees();
    let html = showEmployeesView(allEmployees,employees);
    document.getElementById(PLACEHOLDER).innerHTML = html;

    function render() {
        document.getElementById(PLACEHOLDER).innerHTML = html;
    }

    async function printBonus() {
        html += "<br>Async/await version:<br>";
        for (let e of employees) {
            let bonus = await e.bonus();
            html += `${e.name} bonus: ${bonus}
              total: ${e.salary+bonus}<br>`;
            render();
        }
    }

    printBonus();

    // for (let e of employees) {
    //     e.total()
    //         .then(total=>
    //             html += `${e.name} total: ${total} <br>`)
    //         .catch(bonus=>
    //             html += `${e.name} bonus is too big
	// 			(${bonus}!) <br>`)
    //         .then(render)
    // }

}

function showEmployeesView(allEmployees, employees) {
    let li_items = employees.map(e=>
        `<li>${e} <button
		onclick="removeEmployeeUI(${e.id})">X</button>
		${employeeManagerView(allEmployees,e.managerId)}
	</li>`).join("");
    return `<ul>${li_items}</ul>`;
}

export async function runUI(){
    showEmployees(/*currentEmployees*/await server.getEmployees());
    fillSelect(document.getElementById("managerSelect"),
        await getEmployeesOptions());

}

export async function addEmployeeUI() {
    let errorHTML = "";
    const name = document.getElementById("name").value;
    if (!name || name.trim()=="") {
        errorHTML += "- Имя сотрудника должно быть задано<br>";
    }
    const surname = document.getElementById("surname").value;
    if (!surname || surname.trim()=="") {
        errorHTML += "- Фамилия сотрудника должна быть задана<br>";
    }
    document.getElementById("addEmployeeFormErrorMessage")
        .innerHTML = errorHTML;
    if (errorHTML.length != 0) return;

    let employee = await server.addEmployee(name, surname);
    //const id = addEmployee(name, surname);
    const managerId = document.getElementById("managerSelect").value;
    //setEmployeeManager(id, managerId);
    await server.setEmployeeManager(employee.id, managerId);

    showEmployees(/*currentEmployees*/await server.getEmployees());
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
}

export async function removeEmployeeUI(id) {
    //currentEmployees=removeEmployee(currentEmployees,id);
    await server.removeEmployee(id);
    showEmployees(/*currentEmployees*/await server.getEmployees());
}

function fillSelect(select, values, selectedValue) {
    for (let val of values) {
        const option = document.createElement("option");
        option.text = val.text;
        option.value = val.value;
        if (selectedValue==option.value) option.selected=true;
        select.appendChild(option);
    }
}

export function selectView(values) {
    const values_html = values.map(v=>
        `<option value="${v.value}" 
         ${v.selected?'selected':''}>${v.text}</option>`
    ).join("");
    return `<select>${values_html}</select>`;
}

function employeeManagerView(employees, selectedId) {
    if (!selectedId) return "";
    let values = employees.map(e=>{
        return { text:e.name+" "+e.surname,
            value:e.id,
            selected: e.id===selectedId
        }
    });
    return `<span>${selectView(values)}</span>`;
}

async function getEmployeesOptions() {
    let employees = await server.getEmployees();
    return employees.map(e=> {
        return {text:e.name+' '+e.surname, value:e.id}
    });
}

