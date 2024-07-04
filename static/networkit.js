
// sap.js
export function networkitSearch(chatbox, employees) {
    //chatbox.addMessage("System", "กรุณาระบุข้อมูลที่ต้องการค้นหา");

    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const sapHandlers = data.filter(emp => emp.departmentName && emp.departmentName.toLowerCase().includes("infrastructure"));
            if (sapHandlers.length > 0) {
                sapHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "No employees found handling Network and IT.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });

   }

   

