import axios from 'axios';

const employeesServer = axios.create(
    {baseURL: 'http://localhost:3333/employees'});

function errorResponseHandler(error) {
    // if has response show the error
    if (error.response && error.response.data.message) {
        console.log("SERVER ERROR: "+
            error.response.data.message);
    } else if (error.message) {
        console.log("SERVER ERROR: "+error.message);
    } else {
        console.log("ERROR: "+error);
    }
}

// apply interceptor on response
employeesServer.interceptors.response.use(
    response => response,
    errorResponseHandler
);

export async function getEmployees() {
    let res = await employeesServer.get('');
    return res.data._embedded.employees;
}

export async function addEmployee(name, surname,
                                  managerId = null) {
    let e = await employeesServer.post('',
        {name, surname, managerId});
    return e.data;
}

export async function setEmployeeManager(id, managerId) {
    await employeesServer.post(id+'/managerId?id='+managerId);
}

export async function removeEmployee(id){
    await employeesServer.delete('/'+id);
}
