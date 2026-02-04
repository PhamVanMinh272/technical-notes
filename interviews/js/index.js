// Interview data (modular, easy to extend)
const interviews = [
  { title: "What is a Senior Python Developer?", file: "what-is-a-senior-python-developer.html" },
  { title: "Database Knowledge Guides", file: "database-knowledge-guides.html" },
  { title: "Interview with Charlie", file: "interviews/interview3.html" }
];

// Render list dynamically
const list = document.getElementById("interview-list");

interviews.forEach(interview => {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = interview.title;

  li.addEventListener("click", () => {
    window.location.href = interview.file;
  });

  list.appendChild(li);
});

// Quiz
const quiz = [
  { title: "Core Python Mastery Quiz", file: "core-python-mastery-quiz.html" },
  { title: "Software Engineering Skills Quiz", file: "software-engineering-skills-quiz.html" },
//  { title: "Interview with Charlie", file: "interviews/interview3.html" }
];

// Render list dynamically
const quiz_list = document.getElementById("quiz-list");
quiz.forEach(q => {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.textContent = q.title;

  li.addEventListener("click", () => {
    window.location.href = q.file;
  });

  quiz_list.appendChild(li);
});