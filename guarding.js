function handleRoleChange() {
  const guardForm = document.getElementById("guardPointForm");
  guardForm.style.display = "none";
}
function GoToManagement(){
    window.location.href = "guard.html";
}


function goToRole() {
  const roleSelect = document.getElementById("roleSelect").value;

  if (roleSelect === "logs.html") {
    window.location.href = roleSelect;
  } else if (roleSelect === "manager") {
    const guardForm = document.getElementById("guardPointForm");
    guardForm.style.display = "block";
  }
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
