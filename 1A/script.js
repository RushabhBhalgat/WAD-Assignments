

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    icon.classList.toggle('bi-sun-fill', savedTheme === 'dark');
    icon.classList.toggle('bi-moon-fill', savedTheme === 'light');

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        icon.classList.toggle('bi-sun-fill', isDark);
        icon.classList.toggle('bi-moon-fill', !isDark);
    });
}

// Login Handler
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            // Simple authentication (for demo purposes)
            if (username && password) {
                localStorage.setItem('user', JSON.stringify({ username, role }));
                window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'student-dashboard.html';
            }
        });
    }
}

// Sidebar Navigation
function initializeSidebar() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const pages = document.querySelectorAll('.content-area');

    menuItems.forEach(item => {
        if (item.dataset.page) {
            item.addEventListener('click', () => {
                // Remove active class from all items
                menuItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');

                // Show corresponding page
                pages.forEach(page => {
                    page.classList.add('hidden');
                    if (page.id === item.dataset.page + 'Page') {
                        page.classList.remove('hidden');
                    }
                });
            });
        }
    });
}

// Charts Initialization
function initializeCharts() {
    // Landing Page Charts
    const placementChart = document.getElementById('placementChart');
    if (placementChart) {
        new Chart(placementChart, {
            type: 'bar',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Placement Rate (%)',
                    data: [92, 88, 95, 93, 95],
                    backgroundColor: '#4a90e2'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    const performanceChart = document.getElementById('performanceChart');
    if (performanceChart) {
        new Chart(performanceChart, {
            type: 'line',
            data: {
                labels: ['2019', '2020', '2021', '2022', '2023'],
                datasets: [{
                    label: 'Average CGPA',
                    data: [8.2, 8.4, 8.5, 8.6, 8.7],
                    borderColor: '#4a90e2',
                    tension: 0.3,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }

    // Admin Dashboard Charts
    const attendanceChart = document.getElementById('attendanceChart');
    if (attendanceChart) {
        new Chart(attendanceChart, {
            type: 'bar',
            data: {
                labels: ['CSE', 'ECE', 'ME', 'CE', 'IT'],
                datasets: [{
                    label: 'Attendance Rate (%)',
                    data: [88, 85, 82, 89, 86],
                    backgroundColor: '#4a90e2'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    const departmentChart = document.getElementById('departmentChart');
    if (departmentChart) {
        new Chart(departmentChart, {
            type: 'doughnut',
            data: {
                labels: ['CSE', 'ECE', 'ME', 'CE', 'IT'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: [
                        '#4a90e2',
                        '#50c878',
                        '#f39c12',
                        '#e74c3c',
                        '#9b59b6'
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });
    }

    // Student Dashboard Charts
    const studentAttendanceChart = document.getElementById('studentAttendanceChart');
    if (studentAttendanceChart) {
        new Chart(studentAttendanceChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Attendance (%)',
                    data: [92, 88, 95, 85, 90, 88],
                    borderColor: '#4a90e2',
                    tension: 0.3,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
}

// Logout Handler
function initializeLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
}

// Authentication Check
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        if (window.location.pathname !== '/index.html') {
            window.location.href = 'index.html';
        }
    } else {
        const isAdmin = user.role === 'admin';
        const currentPage = window.location.pathname;
        
        if (currentPage === '/index.html') {
            window.location.href = isAdmin ? 'admin-dashboard.html' : 'student-dashboard.html';
        } else if (isAdmin && currentPage === '/student-dashboard.html') {
            window.location.href = 'admin-dashboard.html';
        } else if (!isAdmin && currentPage === '/admin-dashboard.html') {
            window.location.href = 'student-dashboard.html';
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const addStudentForm = document.getElementById("addStudentForm");

    if (addStudentForm) {
        addStudentForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get input values
            const studentName = addStudentForm.querySelector("input[type='text']").value;
            const department = addStudentForm.querySelector("select:nth-of-type(1)").value;
            const year = addStudentForm.querySelector("select:nth-of-type(2)").value;
            const division = addStudentForm.querySelector("select:nth-of-type(3)").value;

            // Create student object
            const newStudent = {
                name: studentName,
                department: department,
                year: year,
                division: division,
            };

            // Store in localStorage (for demo purposes, replace with API call for backend)
            let students = JSON.parse(localStorage.getItem("students")) || [];
            students.push(newStudent);
            localStorage.setItem("students", JSON.stringify(students));

            // Update UI (Assuming there's a student list table)
            updateStudentList();

            // Close modal
            const modalElement = document.getElementById("addStudentModal");
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();

            // Reset form
            addStudentForm.reset();
        });
    }
});

// Function to update the student list dynamically
function updateStudentList() {
    const studentListContainer = document.getElementById("studentList");
    if (!studentListContainer) return;

    studentListContainer.innerHTML = ""; // Clear previous entries

    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.division}</td>
        `;
        studentListContainer.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateStudentList();
});

// Add Student Functionality
const addStudentForm = document.getElementById("addStudentForm");
if (addStudentForm) {
    addStudentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const studentName = document.getElementById("studentName").value;
        const department = document.getElementById("studentDepartment").value;
        const year = document.getElementById("studentYear").value;
        const division = document.getElementById("studentDivision").value;

        if (!studentName || !department || !year || !division) {
            alert("Please fill in all fields.");
            return;
        }

        const newStudent = { name: studentName, department, year, division };
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students.push(newStudent);
        localStorage.setItem("students", JSON.stringify(students));

        updateStudentList();
        document.getElementById("addStudentMessage").innerText = "Student added successfully!";
        setTimeout(() => document.getElementById("addStudentMessage").innerText = "", 3000);
        addStudentForm.reset();
    });
}

// Function to update the student list dynamically
function updateStudentList() {
    const studentListContainer = document.getElementById("studentList");
    if (!studentListContainer) return;

    studentListContainer.innerHTML = ""; // Clear previous entries

    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.division}</td>
        `;
        studentListContainer.appendChild(row);
    });
}

// Ensure the student list is loaded when the page opens
document.addEventListener("DOMContentLoaded", updateStudentList);



function updateSubjectList() {
    const subjectListContainer = document.getElementById("subjectList");
    if (!subjectListContainer) return;
    subjectListContainer.innerHTML = "";
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    subjects.forEach((subject, index) => {
        subjectListContainer.innerHTML += `<tr><td>${index + 1}</td><td>${subject.subjectCode}</td><td>${subject.subjectName}</td><td>${subject.department}</td><td>${subject.faculty}</td><td>${subject.credits}</td></tr>`;
    });
}

// Update Attendance Section
function updateAttendanceDetails() {
    const attendanceDetails = document.getElementById("attendanceDetails");
    if (!attendanceDetails) return;
    
    attendanceDetails.innerHTML = `
        <p>Total Present: 1700</p>
        <p>Total Absent: 300</p>
        <p>Overall Attendance Rate: 85%</p>
        <p>Highest Attendance: CSE - 92%</p>
        <p>Lowest Attendance: ME - 78%</p>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    checkAuth();
    initializeTheme();
    initializeLogin();
    initializeSidebar();
    initializeCharts();
    initializeLogout();
    updateStudentList();
    updateSubjectList();
    updateAttendanceDetails();
});