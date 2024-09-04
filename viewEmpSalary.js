
let employeeData;
$(document).ready(function () {
    
    $.ajax({
        url: 'http://localhost:8080/api/employees/empAllEmp', 
        method: 'GET',
        success: function (data) {
            var employeeDropdown = $('#employeeDropdown');
            data.forEach(function (employee) {
                employeeDropdown.append($('<option>', {
                    value: employee.name,
                    text: employee.name
                }));
            });
        },
        error: function (error) {
            console.error("Error fetching employees:", error);
        }
    });

    
    fetchEmployeeData();
});

function fetchEmployeeData() {
    var selectedEmployee = $('#employeeDropdown').val();
    var selectedMonth = $('#monthSelect').val();
    // var lossofpay = parseInt($('#lossofpay').val());
    // alert("alert1");
    if (!selectedEmployee || !selectedMonth) {
        console.error('Please select both employee and month.');
        return;
    }

    var url = `http://localhost:8080/findByNameAndMonth2?name=${encodeURIComponent(selectedEmployee)}&month=${encodeURIComponent(selectedMonth)}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            employeeData = data[0]
            console.log("data..",data)
            console.log("employeeData..",employeeData)
            document.getElementById('employeeId').innerHTML = `${employeeData.employeeId}`;
            document.getElementById('employeeName').innerHTML = ` ${employeeData.employeeName}`;
            document.getElementById('employeeEmpCode').innerHTML = `${employeeData.employeeEmpCode}`;
            document.getElementById('employeeAddress').innerHTML = ` ${employeeData.employeeAddress}`;
            document.getElementById('employeeJDate').innerHTML = ` ${employeeData.employeeJDate}`;
            document.getElementById('designationName').innerHTML = `${employeeData.designationName}`;
            document.getElementById('grossSalary').innerHTML = `${employeeData.grossSalary}`;
            document.getElementById('basicSalary').innerHTML = ` ${employeeData.basicSalary}`;
            document.getElementById('ta').innerHTML = ` ${employeeData.ta}`;
            document.getElementById('da').innerHTML = ` ${employeeData.da}`;
            document.getElementById('pf').innerHTML = ` ${employeeData.pf}`;
            document.getElementById('other').innerHTML = ` ${employeeData.other}`;
            document.getElementById('finalBasicSalary').innerHTML = ` ${employeeData.finalBasicSalary}`;
            document.getElementById('deduction').innerHTML = ` ${employeeData.deduction}`;
            document.getElementById('employeeInsurance').innerHTML = `${employeeData.employeeInsurance}`;
            document.getElementById('month').innerHTML = ` ${employeeData.month}`;
            document.getElementById('lossofpay').innerHTML = ` ${employeeData.lossofpay}`;
            document.getElementById('salaryAmount').innerHTML = ` ${employeeData.salaryAmount}`;
            
            // const tbody = document.getElementById("employeeTableBody");

            // Clear any existing rows
            // tbody.innerHTML = "";

           
            // if (Array.isArray(data)) {
            
            //     data.forEach((employee) => {
            //         addEmployeeRow(tbody, employee, selectedMonth);
            //     });
            // } else {
            //     If it's a single object, handle it directly
            //     addEmployeeRow(tbody, data, selectedMonth);
            // }
        })
        .catch((error) => {
            console.error("Error fetching employee data:", error);
        });
}

function addEmployeeRow(tbody, employee, selectedMonth) {
    const tr = document.createElement("tr");

    // Create and append table cells (td) for each column
    // tr.innerHTML = `
    //     <td>${employee.employeeId}</td>
    //     <td>${employee.employeeName}</td>
    //     <td>${employee.employeeEmpCode || 'N/A'}</td>
    //     <td>${employee.employeeAddress || 'N/A'}</td>
    //     <td>${employee.employeeJDate || 'N/A'}</td>
    //     <td>${employee.designationName || 'N/A'}</td>
    //     <td>${employee.grossSalary || 'N/A'}</td>
    //     <td>${employee.basicSalary || 'N/A'}</td>
    //     <td>${employee.ta || 'N/A'}</td>
    //     <td>${employee.da || 'N/A'}</td>
    //     <td>${employee.pf || 'N/A'}</td>
    //     <td>${employee.other || 'N/A'}</td>
    //     <td>${employee.finalBasicSalary || 'N/A'}</td>
    //     <td>${employee.deduction || 'N/A'}</td>
    //     <td>${employee.employeeInsurance || 'N/A'}</td>
    //     <td>${selectedMonth}</td>
    //     <td>${employee.salaryAmount || 'N/A'}</td>
    // `;
    // tbody.appendChild(tr);
}


function getSalary() {
    var selectedEmployee = $('#employeeDropdown').val();
    var selectedMonth = $('#monthSelect').val();
    // var lossofpay = parseInt($('#lossofpay').val());
    if (!selectedEmployee || !selectedMonth) {
        alert('Please select both employee and month.');
        return;
    }

    var url = `http://localhost:8080/findByNameAndMonth?name=${encodeURIComponent(selectedEmployee)}&month=${encodeURIComponent(selectedMonth)}`;

    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            console.log('Response Data:', data);
            employeeData = data
            if (data && data.salary !== undefined) {
                var salaryDetails = `Salary: ${data.salary}</p>`;
                $('#salaryDetails').html(salaryDetails);
            } else {
                $('#salaryDetails').text('Unexpected response format.');
            }
        },
        error: function (error) {
            console.error("Error fetching salary data:", error);
            $('#salaryDetails').text('Error fetching salary data.');
        }
    });
}

function deleteSalary() {
    var selectedEmployee = $('#employeeDropdown').val();
    var selectedMonth = $('#monthSelect').val();
    // var lossofpay = $('#lossofpay').val();

    var url = `http://localhost:8080/deleteByNameAndMonth?name=${encodeURIComponent(selectedEmployee)}&month=${encodeURIComponent(selectedMonth)}`;

    $.ajax({
        url: url,
        method: 'DELETE',
        success: function (data) {
            console.log('Response Data:', data);

            if (typeof data === 'string' && data.toLowerCase().includes('deleted successfully')) {
                $('#salaryDetails').text('Record deleted successfully.');
                
                $('#employeeDropdown').val('');
                $('#monthSelect').val('');
            } else {
                $('#salaryDetails').text(data || 'Delete operation did not return a valid response.');
            }
        },
        error: function (error) {
            console.error("Error deleting data:", error);
            $('#salaryDetails').text('Error deleting data.');
        }
    });
}
