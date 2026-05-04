
let statusMessage = document.getElementById("status");
let studentSection = document.getElementById("student-container");
let coursesSection = document.getElementById("courses-container");

let loadStudentButton = document.getElementById("load-student-btn");
let loadCoursesButton = document.getElementById("load-courses-btn");
let clearButton = document.getElementById("clear-btn");

function getStudentData() {
  let studentPromise = new Promise((resolve, reject) => {
    let isSuccessful = true; // change to false to test error

    setTimeout(() => {
      if (isSuccessful) {
        resolve({
          id: 1,
          name: "Ali Zafar",
          program: "Website Design Specialist",
          semester: "3rd Semester",
          bio: "Specializing in the development of scalable, modern web applications."
        });
      } else {
        reject("Failed to load student data");
      }
    }, 2000);
  });

  return studentPromise;
}

function renderStudent(studentData) {
  studentSection.innerHTML = `
    <h2>${studentData.name}</h2>
    <p><strong>Program:</strong> ${studentData.program}</p>
    <p><strong>Semester:</strong> ${studentData.semester}</p>
    <p>${studentData.bio}</p>
  `;
}

function getCoursesData() {
  let coursesPromise = new Promise((resolve, reject) => {
    let isSuccessful = true; // change to false to test error

    setTimeout(() => {
      if (isSuccessful) {
        resolve([
          { code: "WIP2", title: "Web Interface Programming 2" },
          { code: "AWP", title: "Advanced Programming" },
          { code: "DB2", title: "Database Management Systems 2" }
        ]);
      } else {
        reject("Failed to load courses");
      }
    }, 2000);
  });

  return coursesPromise;
}

function renderCourses(courseList) {
  let courseHTML = "<ul>";

  courseList.forEach((courseItem) => {
    courseHTML += `<li>${courseItem.code} - ${courseItem.title}</li>`;
  });

  courseHTML += "</ul>";

  coursesSection.innerHTML = courseHTML;
}

loadStudentButton.addEventListener("click", () => {
  statusMessage.textContent = "Loading student...";
  studentSection.innerHTML = "";

  getStudentData()
    .then((studentData) => {
      console.log("Student loaded:", studentData);
      renderStudent(studentData);
      statusMessage.textContent = "Student loaded successfully.";
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
      statusMessage.textContent = errorMessage;
    });
});

loadCoursesButton.addEventListener("click", () => {
  statusMessage.textContent = "Loading courses...";
  coursesSection.innerHTML = "";

  getCoursesData()
    .then((courseList) => {
      console.log("Courses loaded:", courseList);
      renderCourses(courseList);
      statusMessage.textContent = "Courses loaded successfully.";
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
      statusMessage.textContent = errorMessage;
    });
});

clearButton.addEventListener("click", () => {
  studentSection.innerHTML = "";
  coursesSection.innerHTML = "";
  statusMessage.textContent = "Ready.";
});