// Interview data (modular, easy to extend)
const interviews = [
  { title: "What is a Senior Python Developer?", file: "what-is-a-senior-python-developer.html" },
  { title: "Interview with Bob", file: "interviews/interview2.html" },
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