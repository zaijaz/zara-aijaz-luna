document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  document.body.appendChild(footer);

  // copyright
  const today = new Date();
  const thisYear = today.getFullYear();
  const copyright = document.createElement("p");
  copyright.innerHTML = `&copy; Zara Aijaz ${thisYear}`;
  footer.appendChild(copyright);

  // list of skills
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "C++",
    "Java",
    "Git",
    "GitHub",
    "VS Code",
    "Adobe Photoshop",
  ];

  // selects Skills section and its ul
  const skillsSection = document.querySelector("#Skills");
  if (!skillsSection) {
    console.error("No #Skills section found!");
    return;
  }
  const skillsList = skillsSection.querySelector("ul");

  // populating
  skills.forEach((skillName) => {
    const li = document.createElement("li");
    li.textContent = skillName;
    skillsList.appendChild(li);
  });
});
