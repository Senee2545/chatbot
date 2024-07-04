from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import pyodbc
import openai


#openai.api_key = 'sk-proj-VxTKnN44PFursEE53DSMT3BlbkFJMvgcVmB1wpPN9wziXeTK'


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')


# Flask proxy endpoint
#@app.route('/ai/generate-response', methods=['POST'])
#def generate_response():
#    data = request.get_json()
#    prompt = data.get('prompt')
#    max_tokens = data.get('max_tokens', 150)

    # Forward the request to OpenAI
#    response = openai.Completion.create(
#        engine="gpt-3.5-turbo",
#        prompt=prompt,
#        max_tokens=max_tokens,
#        temperature=0.5
#    )
#    return jsonify(response)


def get_db_connection():
    return pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};'
                          'SERVER=52.76.126.117;'
                          'DATABASE=KM_AI;'
                          'UID=ai;'
                          'PWD=Toa@2024')

@app.route('/clicks')
def clicks():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM clicks")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([{"id": row[0], "option_id": row[1], "count": row[2]} for row in rows])

@app.route('/track_click', methods=['POST'])
def track_click():
    data = request.get_json()
    option_id = data['optionId']
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT count FROM clicks WHERE option_id = ?", (option_id,))
    result = cursor.fetchone()
    if result:
        new_count = result[0] + 1
        cursor.execute("UPDATE clicks SET count = ? WHERE option_id = ?", (new_count, option_id))
    else:
        cursor.execute("INSERT INTO clicks (option_id, count) VALUES (?, 1)", (option_id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Click recorded successfully'})

# Function to retrieve employee data from an external API
def get_employee_data():
    api_url = "https://api-center.toaasset.com/hrcloud/employeelist"
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzE5OTA1NDY4LCJleHAiOjE3MTk5MDYzNjh9.ddcgf5k0TObQc2o8rr_zhNn840WYPM-NpwPm3FqZYWg"
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print("Error accessing the API")
        return None

@app.route('/employee_details', methods=['GET'])
def employee_details():
    employees = get_employee_data()  # Fetch all employees

    if not employees:
        return jsonify({"error": "Error accessing the employee data"}), 500

    # Return all employee data
    return jsonify(employees)



if __name__ == '__main__':
    app.run(debug=True)

#@app.route('/query_employees', methods=['POST'])
#def query_employees():
    #data = request.get_json()
    #division_query = data['division']
    #department_query = data['department']
    #employees = get_employee_data()

    #if not employees:
        #return jsonify({"error": "Error accessing the employee data"}), 500

    # Filter employees by division and department
    #filtered_employees = [
        #emp for emp in employees 
        #if division_query.lower() in emp.get('divisionName', '').lower() 
        #and department_query.lower() in emp.get('departmentName', '').lower()
    #]

    #if not filtered_employees:
        #return jsonify({"message": "No employees found"}), 404

    # Return minimal data for listing
    #return jsonify([{'departmentName': emp['departmentName'], 'fullName': emp['fullName'], 'prefix': emp['prefix']} for emp in filtered_employees])




#def employee_details():
    # Get employee ID from the request JSON
    #emp_id = request.get_json().get('empId')
    #employees = get_employee_data()  # Fetch all employees

    #if not employees:
        #return jsonify({"error": "Error accessing the employee data"}), 500

    # Find the specific employee
    #employee = next((emp for emp in employees if emp['empId'] == emp_id), None)
    #if not employee:
        #return jsonify({"message": "Employee not found"}), 404

    # Prepare detailed information about the employee
    #details = {key: employee.get(key, f'ไม่พบ{key}') for key in [
        #'empId', 'prefix', 'fullName', 'nickName', 'companyCode', 'companyName',
        #'branch', 'groupName', 'sectionCode', 'sectionName', 'divisionCode', 
        #'divisionName', 'departmentCode', 'departmentName', 'jobDescription', 
        #'rank', 'rankNo', 'supId', 'supName', 'email', 'tel', 'joined', 
        #'stopWork', 'createDateTime', 'avatar', 'empIpPhone']}

    #return jsonify(details)


