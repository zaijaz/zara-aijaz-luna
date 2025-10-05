document.addEventListener("DOMContentLoaded", () => {
  // ---------- footer ----------
  const footer = document.createElement("footer");
  document.body.appendChild(footer);

  const today = new Date();
  const thisYear = today.getFullYear();
  const copyright = document.createElement("p");
  copyright.innerHTML = `&copy; Zara Aijaz ${thisYear}`;
  footer.appendChild(copyright);

  // ---------- skills ----------
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

  const skillsSection = document.querySelector("#Skills");
  if (!skillsSection) {
    console.error("No #Skills section found!");
    return;
  }
  const skillsList = skillsSection.querySelector("ul");

  skills.forEach((skillName) => {
    const li = document.createElement("li");
    li.textContent = skillName;
    skillsList.appendChild(li);
  });

  // --------- message Form ------------
  const messageForm = document.forms["leave_message"];

  // if the form exists, attach listens
  if (messageForm) {
    messageForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const usersName = event.target.usersName.value;
      const usersEmail = event.target.usersEmail.value;
      const usersMessage = event.target.usersMessage.value;

      console.log(usersName, usersEmail, usersMessage);

      const messageSection = document.getElementById("messages");
      const messageList = messageSection.querySelector("ul");

      const newMessage = document.createElement("li");
      newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>:
        <span>${usersMessage}</span>
      `;

      const removeButton = document.createElement("button");
      removeButton.innerText = "remove";
      removeButton.type = "button";

      removeButton.addEventListener("click", function () {
        const entry = removeButton.parentNode;
        entry.remove();
      });

      newMessage.appendChild(removeButton);
      messageList.appendChild(newMessage);

      messageForm.reset();
    });
  } else {
    console.warn("No form with name 'leave_message' found!");
  }
});
