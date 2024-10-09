function goToRole() {
  const selectedRole = document.getElementById("roleSelect").value;
  if (selectedRole) {
    window.location.href = selectedRole;
  } else {
    alert("אנא בחר תפקיד לפני המעבר.");
  }
}
