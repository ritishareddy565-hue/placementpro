const API = "http://localhost:8080/api";

/* =========================
   LOAD STUDENTS
========================= */

async function loadStudents() {
    try {
        const response = await fetch(`${API}/students`);
        const students = await response.json();

        document.getElementById("studentCount").textContent = students.length;

        const list = document.getElementById("studentsList");
        list.innerHTML = "";

        students.forEach(student => {
            const div = document.createElement("div");
            div.className = "item";

            div.innerHTML = `
                <h3>${student.name || ""}</h3>
                <p>Email: ${student.email || ""}</p>
                <p>Branch: ${student.branch || ""}</p>
                <p>CGPA: ${student.cgpa || ""}</p>

                <div class="actions">
                    <button onclick="editStudent(${student.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </div>
            `;

            list.appendChild(div);
        });

    } catch (error) {
        console.error("Student API error:", error);
    }
}


/* =========================
   LOAD JOBS
========================= */

async function loadJobs() {
    try {
        const response = await fetch(`${API}/jobs`);
        const jobs = await response.json();

        document.getElementById("jobCount").textContent = jobs.length;

        const list = document.getElementById("jobsList");
        list.innerHTML = "";

        jobs.forEach(job => {
            const div = document.createElement("div");
            div.className = "item";

            div.innerHTML = `
                <h3>${job.company || ""}</h3>
                <p>Role: ${job.jobRole || ""}</p>
                <p>Location: ${job.location || ""}</p>
                <p>Minimum CGPA: ${job.minimumCgpa || ""}</p>
                <p>Package: ${job.packageLpa || ""} LPA</p>

                <div class="actions">
                    <button onclick="editJob(${job.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteJob(${job.id})">
                        Delete
                    </button>
                </div>
            `;

            list.appendChild(div);
        });

    } catch (error) {
        console.error("Job API error:", error);
    }
}


/* =========================
   LOAD APPLICATIONS
========================= */

async function loadApplications() {
    try {
        const response = await fetch(`${API}/applications`);
        const applications = await response.json();

        document.getElementById("applicationCount").textContent =
            applications.length;

        const list = document.getElementById("applicationsList");
        list.innerHTML = "";

        applications.forEach(application => {
            const div = document.createElement("div");
            div.className = "item";

            div.innerHTML = `
                <h3>${application.studentName || ""}</h3>
                <p>Company: ${application.companyName || ""}</p>
                <p>Role: ${application.jobRole || ""}</p>
                <p>Status: ${application.status || ""}</p>

                <div class="actions">
                    <button onclick="editApplication(${application.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                            onclick="deleteApplication(${application.id})">
                        Delete
                    </button>
                </div>
            `;

            list.appendChild(div);
        });

    } catch (error) {
        console.error("Application API error:", error);
    }
}


/* =========================
   ADD STUDENT
========================= */

async function addStudent() {
    const student = {
        name: document.getElementById("studentName").value,
        email: document.getElementById("studentEmail").value,
        branch: document.getElementById("studentBranch").value,
        cgpa: Number(document.getElementById("studentCgpa").value)
    };

    if (!student.name || !student.email) {
        alert("Please enter student name and email.");
        return;
    }

    try {
        const response = await fetch(`${API}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        alert("Student added successfully!");

        document.getElementById("studentName").value = "";
        document.getElementById("studentEmail").value = "";
        document.getElementById("studentBranch").value = "";
        document.getElementById("studentCgpa").value = "";

        loadStudents();

    } catch (error) {
        alert("Error adding student.");
        console.error(error);
    }
}


/* =========================
   EDIT STUDENT
========================= */

async function editStudent(id) {
    try {
        const response = await fetch(`${API}/students/${id}`);
        const student = await response.json();

        const name = prompt("Student Name:", student.name || "");
        if (name === null) return;

        const email = prompt("Email:", student.email || "");
        if (email === null) return;

        const branch = prompt("Branch:", student.branch || "");
        if (branch === null) return;

        const cgpaInput = prompt("CGPA:", student.cgpa || "");
        if (cgpaInput === null) return;

        const updatedStudent = {
            name: name,
            email: email,
            branch: branch,
            cgpa: Number(cgpaInput)
        };

        const updateResponse = await fetch(`${API}/students/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedStudent)
        });

        if (!updateResponse.ok) {
            throw new Error("Failed to update student");
        }

        alert("Student updated successfully!");
        loadStudents();

    } catch (error) {
        alert("Error updating student.");
        console.error(error);
    }
}


/* =========================
   DELETE STUDENT
========================= */

async function deleteStudent(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API}/students/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete student");
        }

        alert("Student deleted successfully!");
        loadStudents();

    } catch (error) {
        alert("Error deleting student.");
        console.error(error);
    }
}


/* =========================
   ADD JOB
========================= */

async function addJob() {
    const job = {
        company: document.getElementById("companyName").value,
        jobRole: document.getElementById("jobRole").value,
        location: document.getElementById("jobLocation").value,
        minimumCgpa: Number(
            document.getElementById("minimumCgpa").value
        ),
        packageLpa: Number(
            document.getElementById("packageLpa").value
        )
    };

    if (!job.company || !job.jobRole) {
        alert("Please enter company and job role.");
        return;
    }

    try {
        const response = await fetch(`${API}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job)
        });

        if (!response.ok) {
            throw new Error("Failed to add job");
        }

        alert("Job added successfully!");

        document.getElementById("companyName").value = "";
        document.getElementById("jobRole").value = "";
        document.getElementById("jobLocation").value = "";
        document.getElementById("minimumCgpa").value = "";
        document.getElementById("packageLpa").value = "";

        loadJobs();

    } catch (error) {
        alert("Error adding job.");
        console.error(error);
    }
}


/* =========================
   EDIT JOB
========================= */

async function editJob(id) {
    try {
        const response = await fetch(`${API}/jobs/${id}`);
        const job = await response.json();

        const company = prompt("Company Name:", job.company || "");
        if (company === null) return;

        const jobRole = prompt("Job Role:", job.jobRole || "");
        if (jobRole === null) return;

        const location = prompt("Location:", job.location || "");
        if (location === null) return;

        const minimumCgpa = prompt(
            "Minimum CGPA:",
            job.minimumCgpa || ""
        );
        if (minimumCgpa === null) return;

        const packageLpa = prompt(
            "Package (LPA):",
            job.packageLpa || ""
        );
        if (packageLpa === null) return;

        const updatedJob = {
            company: company,
            jobRole: jobRole,
            location: location,
            minimumCgpa: Number(minimumCgpa),
            packageLpa: Number(packageLpa)
        };

        const updateResponse = await fetch(`${API}/jobs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedJob)
        });

        if (!updateResponse.ok) {
            throw new Error("Failed to update job");
        }

        alert("Job updated successfully!");
        loadJobs();

    } catch (error) {
        alert("Error updating job.");
        console.error(error);
    }
}


/* =========================
   DELETE JOB
========================= */

async function deleteJob(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API}/jobs/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete job");
        }

        alert("Job deleted successfully!");
        loadJobs();

    } catch (error) {
        alert("Error deleting job.");
        console.error(error);
    }
}


/* =========================
   ADD APPLICATION
========================= */

async function addApplication() {
    const application = {
        studentName:
            document.getElementById("applicationStudent").value,

        companyName:
            document.getElementById("applicationCompany").value,

        jobRole:
            document.getElementById("applicationRole").value,

        status:
            document.getElementById("applicationStatus").value
    };

    if (
        !application.studentName ||
        !application.companyName
    ) {
        alert("Please enter student and company.");
        return;
    }

    try {
        const response = await fetch(`${API}/applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        });

        if (!response.ok) {
            throw new Error("Failed to add application");
        }

        alert("Application submitted successfully!");

        document.getElementById("applicationStudent").value = "";
        document.getElementById("applicationCompany").value = "";
        document.getElementById("applicationRole").value = "";

        loadApplications();

    } catch (error) {
        alert("Error submitting application.");
        console.error(error);
    }
}


/* =========================
   EDIT APPLICATION
========================= */

async function editApplication(id) {
    try {
        const response =
            await fetch(`${API}/applications/${id}`);

        const application = await response.json();

        const studentName = prompt(
            "Student Name:",
            application.studentName || ""
        );

        if (studentName === null) return;

        const companyName = prompt(
            "Company Name:",
            application.companyName || ""
        );

        if (companyName === null) return;

        const jobRole = prompt(
            "Job Role:",
            application.jobRole || ""
        );

        if (jobRole === null) return;

        const status = prompt(
            "Status:",
            application.status || ""
        );

        if (status === null) return;

        const updatedApplication = {
            studentName: studentName,
            companyName: companyName,
            jobRole: jobRole,
            status: status
        };

        const updateResponse =
            await fetch(`${API}/applications/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedApplication)
            });

        if (!updateResponse.ok) {
            throw new Error("Failed to update application");
        }

        alert("Application updated successfully!");
        loadApplications();

    } catch (error) {
        alert("Error updating application.");
        console.error(error);
    }
}


/* =========================
   DELETE APPLICATION
========================= */

async function deleteApplication(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
        const response =
            await fetch(`${API}/applications/${id}`, {
                method: "DELETE"
            });

        if (!response.ok) {
            throw new Error("Failed to delete application");
        }

        alert("Application deleted successfully!");
        loadApplications();

    } catch (error) {
        alert("Error deleting application.");
        console.error(error);
    }
}


/* =========================
   INITIAL LOAD
========================= */

loadStudents();
loadJobs();
loadApplications();