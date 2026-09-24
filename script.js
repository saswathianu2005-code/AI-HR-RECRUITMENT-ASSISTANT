/* =====================================================
   AI HR RECRUITMENT ASSISTANT
   JavaScript
===================================================== */


/* ===============================
   CANDIDATE DATA
================================ */

const candidates = [

    {
        name: "Arun Kumar",
        initials: "AK",
        role: "Java Developer",
        skills: ["Java", "Spring Boot", "SQL"],
        experience: "3 Years",
        score: 94
    },

    {
        name: "Priya Menon",
        initials: "PM",
        role: "Cloud Engineer",
        skills: ["AWS", "Linux", "Docker"],
        experience: "2 Years",
        score: 91
    },

    {
        name: "Rahul Sharma",
        initials: "RS",
        role: "Data Analyst",
        skills: ["Python", "SQL", "Power BI"],
        experience: "2 Years",
        score: 87
    },

    {
        name: "Divya Raj",
        initials: "DR",
        role: "Frontend Developer",
        skills: ["HTML", "CSS", "JavaScript"],
        experience: "1 Year",
        score: 85
    },

    {
        name: "Karthik S",
        initials: "KS",
        role: "Cloud Engineer",
        skills: ["AWS", "Azure", "Linux"],
        experience: "3 Years",
        score: 89
    },

    {
        name: "Meena Priya",
        initials: "MP",
        role: "HR Analyst",
        skills: ["Excel", "Analytics", "HR"],
        experience: "2 Years",
        score: 82
    }

];


/* ===============================
   PAGE NAVIGATION
================================ */

function showSection(sectionName) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });


    const selected = document.getElementById(sectionName);

    if (selected) {
        selected.classList.add("active-section");
    }


    const navButtons = document.querySelectorAll(".nav-item");

    navButtons.forEach(button => {
        button.classList.remove("active");
    });


    const title = document.getElementById("pageTitle");
    const subtitle = document.getElementById("pageSubtitle");


    if (sectionName === "dashboard") {

        title.textContent = "Recruitment Dashboard";
        subtitle.textContent = "AI-powered candidate management";

    }

    else if (sectionName === "candidates") {

        title.textContent = "Candidate Management";
        subtitle.textContent = "Search and analyse candidates using AI";

        renderCandidates();

    }

    else if (sectionName === "jobs") {

        title.textContent = "Job Openings";
        subtitle.textContent = "Manage your recruitment requirements";

    }

    else if (sectionName === "assistant") {

        title.textContent = "AI Recruitment Assistant";
        subtitle.textContent = "Your intelligent HR recruitment companion";

    }

}


/* ===============================
   RENDER CANDIDATES
================================ */

function renderCandidates(list = candidates) {

    const grid = document.getElementById("candidateGrid");

    grid.innerHTML = "";


    if (list.length === 0) {

        grid.innerHTML = `
            <div style="
                background:white;
                padding:30px;
                border-radius:10px;
                grid-column:1/-1;
                text-align:center;
            ">
                No candidates found.
            </div>
        `;

        return;
    }


    list.forEach(candidate => {

        const card = document.createElement("div");

        card.className = "candidate-card";

        card.innerHTML = `

            <div class="candidate-top">

                <div class="candidate-avatar">
                    ${candidate.initials}
                </div>

                <div>
                    <h3>${candidate.name}</h3>

                    <p>${candidate.role}</p>
                </div>

            </div>


            <div class="skills">

                ${candidate.skills.map(skill => `
                    <span class="skill">
                        ${skill}
                    </span>
                `).join("")}

            </div>


            <div class="match-score">

                <span>
                    ${candidate.experience}
                </span>

                <span class="score">
                    AI Match ${candidate.score}%
                </span>

            </div>

        `;

        grid.appendChild(card);

    });

}


/* ===============================
   CANDIDATE SEARCH
================================ */

function searchCandidates() {

    const query =
        document.getElementById("candidateSearch")
        .value
        .toLowerCase()
        .trim();


    const filtered = candidates.filter(candidate => {

        return (

            candidate.name.toLowerCase().includes(query) ||

            candidate.role.toLowerCase().includes(query) ||

            candidate.skills.some(skill =>
                skill.toLowerCase().includes(query)
            )

        );

    });


    renderCandidates(filtered);

}


/* ===============================
   RESUME UPLOAD
================================ */

function resumeUploaded() {

    const file =
        document.getElementById("resumeInput").files[0];


    if (!file) {
        return;
    }


    alert(
        "Resume uploaded successfully!\n\n" +
        "AI resume screening started for:\n" +
        file.name
    );


    /*
       Real project:
       Send the file to backend / IBM watsonx
       for actual resume analysis.
    */

}


/* ===============================
   DASHBOARD AI
================================ */

function dashboardChat() {

    const input =
        document.getElementById("dashboardInput");

    const message = input.value.trim();


    if (!message) {
        return;
    }


    addMiniUserMessage(message);

    input.value = "";


    setTimeout(() => {

        const response =
            generateAIResponse(message);

        addMiniAIMessage(response);

    }, 600);

}


function quickAsk(message) {

    document.getElementById("dashboardInput").value =
        message;

    dashboardChat();

}


/* ===============================
   MINI CHAT USER
================================ */

function addMiniUserMessage(message) {

    const chat =
        document.getElementById("miniChat");


    const div =
        document.createElement("div");


    div.style.cssText = `
        display:flex;
        justify-content:flex-end;
        margin-bottom:12px;
        font-size:11px;
    `;


    div.innerHTML = `
        <div style="
            background:#6c4cff;
            color:white;
            padding:9px 12px;
            border-radius:8px;
            max-width:75%;
        ">
            ${escapeHTML(message)}
        </div>
    `;


    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}


/* ===============================
   MINI CHAT AI
================================ */

function addMiniAIMessage(message) {

    const chat =
        document.getElementById("miniChat");


    const div =
        document.createElement("div");


    div.className = "ai-message";


    div.innerHTML = `

        <div class="small-ai">
            AI
        </div>

        <div>
            ${message}
        </div>

    `;


    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}


/* ===============================
   AI RESPONSE ENGINE
================================ */

function generateAIResponse(message) {

    const text =
        message.toLowerCase();


    /* FIND CANDIDATES */

    if (
        text.includes("find candidate") ||
        text.includes("candidate")
    ) {

        if (
            text.includes("cloud") ||
            text.includes("aws")
        ) {

            return `
                I found <b>2 Cloud Engineer</b>
                candidates matching your query.
                <br><br>
                <b>Priya Menon</b> — 91% match
                <br>
                <b>Karthik S</b> — 89% match
                <br><br>
                You can open Candidate Management
                to review their skills.
            `;

        }


        return `
            There are currently
            <b>${candidates.length} candidates</b>
            available in the recruitment database.
            <br><br>
            I can filter them by role, skills,
            experience or AI match score.
        `;

    }


    /* INTERVIEW QUESTIONS */

    if (
        text.includes("interview") ||
        text.includes("question")
    ) {

        return `
            <b>Suggested interview questions:</b>
            <br><br>
            1. Tell me about your recent project.
            <br>
            2. What technical challenge did you solve?
            <br>
            3. How do you handle production issues?
            <br>
            4. Explain a technology you have worked with.
            <br>
            5. How do you work within a team?
        `;

    }


    /* JOB DESCRIPTION */

    if (
        text.includes("job description") ||
        text.includes("create job")
    ) {

        return `
            I can help create a job description.
            <br><br>
            Please provide:
            <br>
            • Job title
            <br>
            • Required skills
            <br>
            • Experience
            <br>
            • Location
            <br>
            • Employment type
        `;

    }


    /* SHORTLIST */

    if (
        text.includes("shortlist") ||
        text.includes("screen")
    ) {

        return `
            For AI-assisted screening, you can compare
            candidates using:
            <br><br>
            ✓ Required technical skills
            <br>
            ✓ Relevant experience
            <br>
            ✓ Role requirements
            <br>
            ✓ Resume information
            <br><br>
            The final hiring decision should be reviewed
            by the HR team.
        `;

    }


    /* DEFAULT */

    return `
        I can assist with recruitment tasks such as:
        <br><br>
        • Candidate search
        <br>
        • Resume screening
        <br>
        • Interview questions
        <br>
        • Job descriptions
        <br>
        • Recruitment pipeline
        <br><br>
        What would you like to work on?
    `;

}


/* ===============================
   FULL AI ASSISTANT
================================ */

function fullChatSend() {

    const input =
        document.getElementById("fullInput");

    const message =
        input.value.trim();


    if (!message) {
        return;
    }


    addFullUser(message);

    input.value = "";


    setTimeout(() => {

        addFullAI(
            generateAIResponse(message)
        );

    }, 600);

}


function askFull(message) {

    document.getElementById("fullInput").value =
        message;

    fullChatSend();

}


/* ===============================
   FULL USER MESSAGE
================================ */

function addFullUser(message) {

    const chat =
        document.getElementById("fullChat");


    const div =
        document.createElement("div");


    div.style.cssText = `
        display:flex;
        justify-content:flex-end;
        margin-bottom:18px;
    `;


    div.innerHTML = `

        <div style="
            background:#6c4cff;
            color:white;
            padding:12px 15px;
            border-radius:9px;
            max-width:60%;
            font-size:12px;
        ">
            ${escapeHTML(message)}
        </div>

    `;


    chat.appendChild(div);

    chat.scrollTop =
        chat.scrollHeight;

}


/* ===============================
   FULL AI MESSAGE
================================ */

function addFullAI(message) {

    const chat =
        document.getElementById("fullChat");


    const div =
        document.createElement("div");


    div.className =
        "full-ai-message";


    div.style.marginBottom =
        "18px";


    div.innerHTML = `

        <div class="large-avatar">
            AI
        </div>

        <div class="full-bubble">
            ${message}
        </div>

    `;


    chat.appendChild(div);

    chat.scrollTop =
        chat.scrollHeight;

}


/* ===============================
   JOB MODAL
================================ */

function openJobModal() {

    document
        .getElementById("jobModal")
        .classList.add("show");

}


function closeJobModal() {

    document
        .getElementById("jobModal")
        .classList.remove("show");

}


/* ===============================
   CREATE JOB
================================ */

function createJob() {

    const title =
        document.getElementById("jobTitle").value.trim();

    const skills =
        document.getElementById("jobSkills").value.trim();

    const positions =
        document.getElementById("jobPositions").value;


    if (!title || !skills) {

        alert(
            "Please enter Job Title and Required Skills."
        );

        return;
    }


    alert(
        "Job created successfully!\n\n" +
        "Position: " + title +
        "\nSkills: " + skills +
        "\nPositions: " + positions
    );


    closeJobModal();


    document.getElementById("jobTitle").value = "";
    document.getElementById("jobSkills").value = "";

}


/* ===============================
   ESCAPE HTML
================================ */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* ===============================
   INITIALIZE
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderCandidates();


        /* Enter key - dashboard */

        document
            .getElementById("dashboardInput")
            .addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {
                        dashboardChat();
                    }

                }
            );


        /* Enter key - full AI */

        document
            .getElementById("fullInput")
            .addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {
                        fullChatSend();
                    }

                }
            );

    }
);

