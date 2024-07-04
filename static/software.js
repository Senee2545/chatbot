// software.js
export function softwareSearch(chatbox) {
    const options = [
        { id: "HRCloud", text: "1. HR Cloud" },
        { id: "Orisoft", text: "2. Orisoft" },
        { id: "HRClick", text: "3. HR Click" },
        { id: "ITServicedesk", text: "4. IT Servicedesk" },
    ];

    chatbox.currentOptionId = 'softwareSearch';
    chatbox.addMessage("System","กรุณาระบุข้อมูลที่ต้องการค้นหา");
    // Add a message to the chatbox from 'System' and then list each software option as a button
    options.forEach(option => {
        chatbox.addMessage("System", `<button class='search-option' data-id='${option.id}'>${option.text}</button>`);
    });

    // Ensure the DOM has updated before attaching events to the newly created buttons
    requestAnimationFrame(() => chatbox.enableOptions());
}

// In software.js
export function HRCloudSearch(chatbox) {
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
}

export function OrisoftSearch(chatbox) {
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
}

export function HRClickSearch(chatbox) {
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
}

    
export function ITServicedeskSearch(chatbox) {
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
    chatbox.addMessage("System", "ชื่อ: นาย เสนีย์ เพ็ชร์สุขุม<br>ฝ่าย: Digital Transformation<br>แผนก: Digital Platform<br> ตำแหน่ง: S1<br>Email: senee_p@toagroup.com<br> Tel: <br> Job Description:");
}
    

