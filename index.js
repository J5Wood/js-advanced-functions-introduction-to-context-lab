function createEmployeeRecord(employeeArray) {
    let newEmployee = {
        firstName:  employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee;
}

function createEmployeeRecords(recordsArray) {
    return recordsArray.map(record => createEmployeeRecord(record));
}

function formatTime(type, time) {
    return {type: type, date: time.split(" ")[0], hour: parseInt(time.split(" ")[1])}
}

function createTimeInEvent(employee, time) {
    employee.timeInEvents.push(formatTime("TimeIn", time));
    return employee;
}

function createTimeOutEvent(employee, time) {
    employee.timeOutEvents.push(formatTime("TimeOut", time));
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(element => element.date === date).hour;
    const timeOut = employee.timeOutEvents.find(element => element.date === date).hour;
    const hoursWorked = (timeOut - timeIn) * .01;
    return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    const pay = employee.payPerHour * hours;
    return pay;
}

function allWagesFor(employee) {
    const hoursWorked = employee.timeInEvents.map(day => hoursWorkedOnDate(employee, day.date));
    const totalHours = hoursWorked.reduce((total, hours) => total + hours);
    return totalHours * employee.payPerHour;
}

function calculatePayroll(employees) {
    const allWages = employees.map(employee => allWagesFor(employee));
    const totalPay = allWages.reduce((total, wage) => total + wage);
    return totalPay;
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(employee => employee.firstName === name)
}