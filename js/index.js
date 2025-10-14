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

  // if the form exists, attach listeners
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

  // ---------- fetch github repositories and display ----------
  const GITHUB_USERNAME = "zaijaz";

  async function fetchGitHubRepos(username) {
    const projectSection = document.querySelector("#Projects");
    if (!projectSection) {
      console.error("No #Projects section found!");
      return;
    }
    const projectList = projectSection.querySelector("ul");

    projectList.innerHTML = "";

    const url = `https://api.github.com/users/${encodeURIComponent(
      username
    )}/repos?per_page=100&sort=updated`;

    try {
      const loadingItem = document.createElement("li");
      loadingItem.textContent = "Loading projects...";
      projectList.appendChild(loadingItem);

      const response = await fetch(url);

      loadingItem.remove();

      if (!response.ok) {
        throw new Error(
          `GitHub API request failed: ${response.status} ${response.statusText}`
        );
      }

      const repositories = await response.json();

      if (!Array.isArray(repositories) || repositories.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No public repositories found for this user.";
        projectList.appendChild(emptyItem);
        console.log("Repositories:", repositories);
        return;
      }

      for (let i = 0; i < repositories.length; i++) {
        const repo = repositories[i];
        const project = document.createElement("li");

        // link to repository
        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.target = "_blank";
        repoLink.rel = "noopener noreferrer";
        repoLink.textContent = repo.name;

        // description
        const meta = document.createElement("span");
        meta.style.display = "block";
        meta.style.fontSize = "0.9rem";
        meta.style.marginTop = "6px";
        meta.style.color = "rgba(224,224,224,0.8)";
        const description = repo.description ? repo.description : "";
        meta.textContent = `${description}  ⭐ ${repo.stargazers_count}`;

        project.appendChild(repoLink);
        project.appendChild(meta);
        projectList.appendChild(project);
      }

      console.log("Fetched repositories:", repositories);
    } catch (error) {
      console.error("An error occurred while fetching repos:", error);

      // error message

      const errorItem = document.createElement("li");
      errorItem.textContent =
        "Could not load projects from GitHub. Please try again later.";
      projectList.appendChild(errorItem);

      const detailsItem = document.createElement("li");
      detailsItem.style.fontSize = "0.85rem";
      detailsItem.style.color = "rgba(255,200,200,0.9)";
      detailsItem.textContent = `Error: ${error.message}`;
      projectList.appendChild(detailsItem);
    }
  }

  // calls fetch function
  fetchGitHubRepos(GITHUB_USERNAME);
});
