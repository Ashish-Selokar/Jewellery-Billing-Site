let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];

function markAttendance(status) {
    const name = document.getElementById("employeeName").value;
    if (name === "") {
        alert("Please enter employee name.");
        return;
    }
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const time = date.toLocaleTimeString();
    
    attendanceData.push({ name, date: formattedDate, time, status });
    localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
    updateAttendanceTable();
    updateChart();
    updateSummary();
}

function updateAttendanceTable() {
    const tbody = document.getElementById("attendanceList");
    tbody.innerHTML = "";
    attendanceData.forEach((entry, index) => {
        const rowClass = entry.status === 'Present' ? 'present-row' : 'absent-row';
        tbody.innerHTML += `<tr class="${rowClass}">
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.date}</td>
            <td>${entry.time}</td>
            <td>${entry.status}</td>
        </tr>`;
    });
}

function searchAttendance() {
    const name = document.getElementById("searchEmployee").value;
    const results = attendanceData.filter(entry => entry.name.toLowerCase() === name.toLowerCase());
    
    const tbody = document.getElementById("searchResults");
    tbody.innerHTML = "";
    results.forEach((entry, index) => {
        const rowClass = entry.status === 'Present' ? 'present-row' : 'absent-row';
        tbody.innerHTML += `<tr class="${rowClass}">
            <td>${index + 1}</td>
            <td>${entry.date}</td>
            <td>${entry.time}</td>
            <td>${entry.status}</td>
        </tr>`;
    });

    updateChart(results);
}

function updateChart(data = attendanceData) {
    const ctx = document.getElementById("attendanceChart").getContext("2d");

    let presentCount = data.filter(entry => entry.status === "Present").length;
    let absentCount = data.filter(entry => entry.status === "Absent").length;

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Present", "Absent"],
            datasets: [{
                data: [presentCount, absentCount],
                backgroundColor: ["#28a745", "#dc3545"]
            }]
        }
    });
}

function sortAttendance() {
    attendanceData.sort((a, b) => a.name.localeCompare(b.name));
    updateAttendanceTable();
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Name,Date,Time,Status\n";
    attendanceData.forEach(row => {
        csvContent += `${row.name},${row.date},${row.time},${row.status}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_data.csv");
    document.body.appendChild(link);
    link.click();
}

document.addEventListener("DOMContentLoaded", () => {
    updateAttendanceTable();
    updateChart();
});
