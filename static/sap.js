/// sap.js
let sapEmployeeData = [];

export function sapSearch(chatbox) {
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const sapHandlers = data.filter(emp => emp.jobDescription && emp.jobDescription.toLowerCase().includes("sap"));
            if (sapHandlers.length > 0) {
                //sapEmployeeData = sapHandlers;
                sapHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
                //chatbox.addMessage("System", "Data retrieved. What would you like to know about SAP handlers?");
            } else {
                chatbox.addMessage("System", "No employees found handling SAP.");
                
                
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
           
        });
}










