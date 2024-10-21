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


        loadGuardPoints(true);
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
function loadGuardPoints(isManager) {
    fetch('http://localhost:4720/get-points')
        .then(response => response.json())
        .then(data => {
            const guardPointsList = document.getElementById("guardPointsList");
            guardPointsList.innerHTML = '';

            data.points.forEach(point => {
                const newPoint = document.createElement("li");
                newPoint.textContent = `שם: ${point.pointName}, מיקום: ${point.location}`;


                if (!isManager) {
                    const markButton = document.createElement("button");
                    markButton.textContent = "סמן הגעה";
                    markButton.onclick = () => markArrival(point.id);
                    newPoint.appendChild(markButton);
                }


                if (point.arrivalTime) {
                    const arrivalTime = document.createElement("span");
                    arrivalTime.textContent = ` זמן הגעה: ${new Date(point.arrivalTime).toLocaleString()}`;
                    newPoint.appendChild(arrivalTime);
                }

                guardPointsList.appendChild(newPoint);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function markArrival(pointId) {
    const arrivalTime = new Date().toISOString();

    fetch('http://localhost:4720/mark-arrival', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pointId, arrivalTime })
    })
        .then(response => response.json())
        .then(data => {
            alert("הגעתך לנקודה סומנה בהצלחה!");
            loadGuardPoints(false);
        })
        .catch(error => {
            console.error('Error:', error);
        });


}

window.onload = function() {
    const isManager = window.location.pathname.includes('manager');
    loadGuardPoints(isManager);
};
