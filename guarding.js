function handleRoleChange() {
  const roleSelect = document.getElementById("roleSelect").value;
  const guardForm = document.getElementById("guardPointForm");

  if (roleSelect === "manager") {
    guardForm.style.display = "block";
  } else {
    guardForm.style.display = "none";
  }
}

function goToRole() {
  const roleSelect = document.getElementById("roleSelect").value;

  if (roleSelect === "logs.html") {
    window.location.href = roleSelect;
  }
}
function goToManagement() {
  window.location.href = "guard.html";
}
function addGuardPoint(event) {
  event.preventDefault();

  const pointName = document.getElementById("pointName").value;
  const location = document.getElementById("location").value;

  fetch('http://localhost:4720/add-point', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pointName, location })
  })
      .then(response => response.json())
      .then(data => {

        const newPoint = document.createElement("li");
        newPoint.textContent = `שם: ${data.point.pointName}, מיקום: ${data.point.location}`;
        const guardPointsList = document.getElementById("guardPointsList");
        guardPointsList.appendChild(newPoint);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  document.getElementById("pointName").value = '';
  document.getElementById("location").value = '';
}
