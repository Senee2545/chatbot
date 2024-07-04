// FandA.js

export function FandASearch(chatbox){
    const options = [
        { id: "CostAccounting", text: "1. Cost Accounting" },
        { id: "AccountPayable", text: "2. Account Payable" },
        { id: "AccountReceivable", text: "3. Account Receivable" },
        { id: "CSIR", text: "4. Company Secretary <br>and Investor-Relations" },
        { id: "FinancialPlanningAnalysis", text: "5. Financial Planning & Analysis" },
        { id: "GeneralAccountingTax", text: "6. General Accounting & Tax" },
        { id: "SubsidiariesJV", text: "7. Subsidiaries & JV" },
        { id: "TreasuryOperation", text: "8. Treasury Operation" },
    ];

    chatbox.currentOptionId = 'FandASearch';
    chatbox.addMessage("System","กรุณาระบุข้อมูลที่ต้องการค้นหา");
    // Add a message to the chatbox from 'System' and then list each software option as a button
    options.forEach(option => {
        chatbox.addMessage("System", `<button class='search-option' data-id='${option.id}'>${option.text}</button>`);
    });

    // Ensure the DOM has updated before attaching events to the newly created buttons
    requestAnimationFrame(() => chatbox.enableOptions());
}

export function CostAccountingSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("cost accounting")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });
}

export function AccountPayableSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("account payable")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });
}

export function AccountReceivableSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("account receivable")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });
}

export function CSIRSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("company secretary and investor-relations")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });
}
   
export function FinancialPlanningAnalysisSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("financial planning & analysis")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });
}

export function GeneralAccountingTaxSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("general accounting & tax")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });
}

export function SubsidiariesJVSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("subsidiaries & jv")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });
}

export function TreasuryOperationSearch(chatbox) {
    chatbox.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
    fetch('/employee_details')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error, status = ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data:", data);
            const costAccountingHandlers = data.filter(emp => 
                emp.departmentName && emp.departmentName.toLowerCase().includes("treasury operation")
            );

            if (costAccountingHandlers.length > 0) {
                costAccountingHandlers.forEach(emp => {
                    const employeeInfo = `<div class='employee-info'>${emp.prefix} ${emp.fullName},<br>Division: ${emp.divisionName},<br>Department: ${emp.departmentName},<br>Email: ${emp.email},<br>Tel: ${emp.tel},<br>Job: ${emp.jobDescription}</div>`;
                    chatbox.addMessage("System", employeeInfo);
                });
            } else {
                chatbox.addMessage("System", "ไม่พบบุคลากรในฝ่ายนี้.");
            }
        })
        .catch(error => {
            console.error('Failed to fetch employees:', error);
            chatbox.addMessage("System", "Error fetching employee data: " + error.message);
        });

}