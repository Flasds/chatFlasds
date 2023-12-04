// public/app.js
document.addEventListener('DOMContentLoaded', () => {
  const addStudentForm = document.getElementById('addStudentForm');
  const studentsList = document.getElementById('studentsList');

  addStudentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const email = document.getElementById('email').value;

    try {
      const response = await fetch('/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, rollNumber, email }),
      });

      const newStudent = await response.json();
      displayStudent(newStudent);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  });

  // Fetch and display existing students
  async function fetchAndDisplayStudents() {
    try {
      const response = await fetch('/students');
      const students = await response.json();
      students.forEach(displayStudent);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  }

  // Display a single student
  function displayStudent(student) {
    const studentDiv = document.createElement('div');
    studentDiv.innerHTML = `<strong>${student.name}</strong> (${student.rollNumber}) - ${student.email}`;
    studentsList.appendChild(studentDiv);
  }

  // Fetch and display students on page load
  fetchAndDisplayStudents();
});
