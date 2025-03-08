const stepsContainers = document.querySelectorAll(".step");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
// Get all checkboxes in the second step
const topicsCheckboxes = document.querySelectorAll(
  ".step.two input[type='checkbox']"
);
const nameSpan = document.getElementById("user-name");
const emailSpan = document.getElementById("user-email");
const topicList = document.querySelector(".user-topic-list");
const continueBtn = document.querySelector(".continue-btn");
const currentStepSpan = document.getElementById("current-step");
const stepsCircles = document.querySelectorAll(".step-circle");
let currentStep = 1;
let maxStep = 1; // The farthest step the user has completed

const showStep = (step) => {
  stepsContainers.forEach((container) => {
    container.style.display = "none";
  });
  stepsContainers[step - 1].style.display = "flex";
  currentStepSpan.textContent = step;

  // Change button text to "Confirm" on last step
  continueBtn.textContent = step < 3 ? "Continue" : "Confirm";

  // Update active circle
  stepsCircles.forEach((circle, idx) => {
    circle.classList.toggle("active-circle", idx === step - 1);
  });
};

const nextStep = () => {
  currentStep++;
  showStep(currentStep);
};

// Call showStep on page load
document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);

  // Let user jump back to completed steps but not forward
  stepsCircles.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      if (index + 1 <= maxStep) {
        currentStep = index + 1;
        showStep(currentStep);
      }
    });
  });
});

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

continueBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Step 1 validation
  if (currentStep === 1) {
    if (!userName.value.trim() || !userEmail.value.trim()) {
      alert("Please enter your name and email before continuing.");
      return;
    }
    // Additional email validation
    if (!validateEmail(userEmail.value)) {
      alert("Please enter a valid email address.");
      return;
    }

    maxStep = Math.max(maxStep, 2);
  }

  // Step 2 validation
  if (currentStep === 2) {
    const checkedBoxes = Array.from(topicsCheckboxes).filter((c) => c.checked);
    if (checkedBoxes.length === 0) {
      alert("Please select at least one topic before continuing.");
      return;
    }
    // Move from step 2 to step 3
    nextStep(); // Show step 3
    // Update the summary

    nameSpan.textContent = userName.value;
    emailSpan.textContent = userEmail.value;

    // Clear old list items
    topicList.innerHTML = "";

    // Add each selected topic
    checkedBoxes.forEach((checkbox) => {
      const label = document.querySelector(`label[for="${checkbox.id}"]`);
      if (label) {
        const li = document.createElement("li");
        li.textContent = label.textContent;
        topicList.appendChild(li);
      }
    });
    maxStep = Math.max(maxStep, 3);
    return;
  }

  if (currentStep === 3) {
    alert("Success!");
    window.location.reload();
    return;
  }

  if (currentStep < stepsContainers.length) {
    currentStep++;
    showStep(currentStep);
  }
});
