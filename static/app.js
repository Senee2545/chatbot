class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            inputField: document.querySelector('.chatbox__footer input'),
            messagesContainer: document.querySelector('.chatbox__messages'),
            modeButtons: document.querySelectorAll('.mode'),
            clearButton: document.querySelector('.chatbox__clear'),
            backButton: document.querySelector('.goBack')
        };
        this.state = "init";
        this.messages = [];
        this.navigationHistory = [];
        this.currentOptionId = 'init';
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;
        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        this.args.backButton.addEventListener('click', () => this.goBack());
        this.args.inputField.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
        this.handleEmployeeSearchOptions();  // Display options after the initial message
        this.args.clearButton.addEventListener('click', () => this.clearChat());
        this.setupBackButton();
    }
    
    toggleState(chatbox) {
        chatbox.classList.toggle('chatbox--active');
        this.args.inputField.focus();
    }

    onSendButton(chatbox) {
        const text = this.args.inputField.value.trim();
        this.args.inputField.value = '';
        if (text === "") return;
        this.processInput(text);
    }

    handleEmployeeSearchOptions() {
        const options = [
            { id: "sap", text: "1. SAP" },
            { id: "networkit", text: "2. Network&IT" },
            { id: "software", text: "3. Software" },
            { id: "FandA", text: "4. Finance & Account" },  
        ];   

        this.addMessage("System", "สวัสดีค่ะ TOA Assistant ยินดีให้บริการค่ะ ");
        this.addMessage("System", "คุณสามารถเลือกโหมดเพื่อค้นหาข้อมูลผู้ที่รับผิดชอบแต่ละส่วนตามรายการด้านล่างนี้ค่ะ ");
        this.updateChatText();
        options.forEach(option => {
            this.addMessage("System", `<button class='search-option' data-id='${option.id}'>${option.text}</button>`);
        });
        // Ensure the DOM has updated before attaching events
        requestAnimationFrame(() => this.enableOptions());
    }

    processInput(text) {
        this.addMessage("User", text);
        this.enableOptions();
        //const lowerCaseText = text.toLowerCase();       
    }

    addMessage(sender, message) {
        console.log(`Adding message from ${sender}: ${message}`); // Debugging output
        this.messages.push({ name: sender, message: message });
        this.updateChatText();
    }
    
    updateChatText() {
        const chatMessage = this.args.messagesContainer;
        chatMessage.innerHTML = this.messages.slice().reverse().map(item => 
            `<div class="messages__item messages__item--${item.name === 'User' ? 'operator' : 'visitor'}">${item.message}</div>`
        ).join('');
        chatMessage.scrollTop = chatMessage.scrollHeight; 
    }

    // Correct context usage in enableOptions method
    enableOptions() {
        // This ensures the DOM has been updated before trying to add event listeners
        setTimeout(() => {
            const options = document.querySelectorAll('.search-option');
            options.forEach(option => {
                option.addEventListener('click', (event) => {
                    const optionId = event.target.dataset.id;
                    this.handleSearchOptionClick(optionId);
                });
            });
            console.log("Event listeners attached to options:", options.length);
        }, 100); // Slightly delay to ensure buttons are rendered
    }
    
    clearEverything() {
        this.messages = [];
        this.updateChatText();
        //this.currentOptionId = 'init'; 
        this.args.inputField.value = ''; // Clear the input field if necessary
        // Reset any other UI elements or internal state as needed
    }

    goBack(){
        this.messages = [];
        this.state = "init";
        this.updateChatText();
    }

    clearChat() {
        this.messages = [];  // Clear the messages array
        this.state = "init";  // Reset any other state variables as needed
        this.updateChatText();  // Clear the chat display
        this.handleEmployeeSearchOptions();  // Optionally, reinitialize the options or any other setup
    }
    
    handleSearchOptionClick(optionId) {
        console.log("Option clicked:", optionId);  // This logs which option is clicked
        this.currentOptionId = optionId;  // Here the currentOptionId should be updated correctly
        //this.setupBackButton();
        this.trackOptionClick(optionId);
        switch (optionId) {
            case "sap":
                import('./sap.js')
                    .then(module => {
                        this.clearEverything();
                        module.sapSearch(this);
                        this.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
                    })
                    .catch(error => {
                        console.error('Error loading the SAP module:', error);
                        this.addMessage("System", "Failed to load SAP functionality due to an error.");
                    });
                break;
            
            case "networkit":
                import('./networkit.js')
                    .then(module => {
                        this.clearEverything();
                        module.networkitSearch(this);
                        this.addMessage("System", "นี่คือบุคคลที่เกี่ยวข้องค่ะ");
                    })
                    .catch(error => {
                        console.error('Error loading the networkit module:', error);
                        this.addMessage("System", "Failed to load networkit functionality due to an error.");
                    });
                break;

            case "software":
                import('./software.js')
                    .then(module => {
                        this.clearEverything();
                        module.softwareSearch(this);
                    }).catch(error => {
                        console.error('Error loading the software module:', error);
                        this.addMessage("System", "Failed to load software functionality due to an error.");
                    });
                break;
            
            case "HRCloud":
                import('./software.js')
                    .then(module => {
                        this.clearEverything();
                        module.HRCloudSearch(this);
                        
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load HR Cloud functionality due to an error.");
                    })
                break;
            
            case "Orisoft":
                import('./software.js')
                    .then(module => {
                        this.clearEverything();
                        module.OrisoftSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Orisoft functionality due to an error.");
                    })
                break;
            
            case "HRClick":
                import('./software.js')
                    .then(module => {
                        this.clearEverything();
                        module.HRClickSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load HR Click functionality due to an error.");
                    })
                break;
            
            case "ITServicedesk":
                import('./software.js')
                    .then(module => {
                        this.clearEverything();
                        module.ITServicedeskSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load IT Servicedesk functionality due to an error.");
                    })
                break;

            case "FandA":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.FandASearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;

            case "CostAccounting":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.CostAccountingSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;

            case "AccountPayable":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.AccountPayableSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;
            
            case "AccountReceivable":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.AccountReceivableSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;

            case "CSIR":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.CSIRSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;

            case "FinancialPlanningAnalysis":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.FinancialPlanningAnalysisSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;
            
            case "GeneralAccountingTax":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.GeneralAccountingTaxSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;
            
            case "SubsidiariesJV":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.SubsidiariesJVSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;

            case "TreasuryOperation":
                import('./FandA.js')
                    .then(module => {
                        this.clearEverything();
                        module.TreasuryOperationSearch(this);
                    }).catch(error =>{
                        console.error('Error loading the Finance & Account module:', error);
                        this.addMessage("System", "Failed to load Finance & Account functionality due to an error.");
                    })
                break;    
        }
    }

    getCurrentOptionId() {
        console.log("Current Option ID is: ", this.currentOptionId);
        return this.currentOptionId;
    }
    
    setupBackButton() {
        this.args.backButton.addEventListener('click', () => {
            this.args.backButton.removeEventListener('click', this.backButtonListener);
            const currentOptionId = this.getCurrentOptionId();
            console.log("Back button clicked, currentOptionId:", currentOptionId);
            switch (currentOptionId) {
                case 'sap':
                case 'networkit':
                case 'software':
                case 'FandA':
                case 'softwareSearch':
                case 'FandASearch':
                    import('./app.js').then(module => {
                        //console.log("Resetting to main options");
                        this.clearEverything();
                        this.handleEmployeeSearchOptions();
                    }).catch(error => {
                        console.error('Error loading app.js:', error);
                    });
                    break;
                
                case 'HRCloud':
                case 'Orisoft':
                case 'HRClick':
                case 'ITServicedesk':
                    import('./software.js').then(module => {
                        this.clearEverything();
                        module.softwareSearch(this); // แก้ไขเป็นชื่อฟังก์ชันที่ถูกต้อง
                    }).catch(error => {
                        console.error('Error loading software.js:', error);
                    });
                    break;
                
                case 'CostAccounting':
                case 'AccountPayable':
                case 'AccountReceivable':
                case 'CSIR':
                case 'FinancialPlanningAnalysis':
                case 'GeneralAccountingTax':
                case 'SubsidiariesJV':
                case 'TreasuryOperation':
                    import('./FandA.js').then(module => {
                        this.clearEverything();
                        module.FandASearch(this); // แก้ไขเป็นชื่อฟังก์ชันที่ถูกต้อง
                    }).catch(error => {
                        console.error('Error loading software.js:', error);
                    });
                    break;
                // Handle other cases...
                default:
                    import('./app.js').then(module => {
                        //console.log("Resetting to main options");
                        this.clearEverything();
                        this.handleEmployeeSearchOptions();
                    }).catch(error => {
                        console.error('Error loading app.js:', error);
                    });
                    break;
                    
            }
        });
        this.args.backButton.addEventListener('click', this.backButtonListener);
}

    trackOptionClick(optionId) {
        fetch('/track_click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ optionId })
        })
        .then(response => response.json())
        .then(data => console.log('Click tracked:', data))
        .catch(error => console.error('Error tracking click:', error));
    }    
}

document.addEventListener('DOMContentLoaded', () => {
    const chatbox = new Chatbox();
    chatbox.display();
    setupSliders();
    chatbox.setupBackButton();
});

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.add-btn');
    const optionsMenu = document.querySelector('.options-menu');
    const messageInput = document.querySelector('.chatbox__footer input');
    const sendButton = document.querySelector('.chatbox__send--footer');
    const openDalleBtn = document.getElementById('open-dalle');
    const translateBtn = document.getElementById('translate');

    addButton.addEventListener('click', () => {
        if (optionsMenu.style.display === 'none' || !optionsMenu.style.display) {
            optionsMenu.style.display = 'block'; // Show options menu
            messageInput.style.display = 'none';  // Hide message input
            sendButton.style.display = 'none';    // Hide send button
        } else {
            optionsMenu.style.display = 'none';   // Hide options menu
            messageInput.style.display = 'block'; // Show message input
            sendButton.style.display = 'block';   // Show send button
        }
        openDalleBtn.addEventListener('click', () => {
            window.open('https://copilot.microsoft.com/'); // ใส่ URL ของหน้าเว็บที่ต้องการเปิด
        });
        translateBtn.addEventListener('click', () => {
            window.open('https://copilot.microsoft.com/'); // ใส่ URL ของหน้าเว็บที่ต้องการเปิด
        });
    });
});


