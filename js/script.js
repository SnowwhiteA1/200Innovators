function register() {
  // 1️⃣ Get values from input fields
  const name = document.getElementById("name").value;
  const sirname = document.getElementById("sirname").value;
  const email = document.getElementById("email").value;
  const confEmail = document.getElementById("conf_email").value;
  const password = document.getElementById("pass").value;
  const confPassword = document.getElementById("password").value;

  // 2️⃣ Frontend validation
  if (!name || !sirname || !email || !password) {
    alert("All fields are required");
    return;
  }

  if (email !== confEmail) {
    alert("Emails do not match");
    return;
  }

  if (password !== confPassword) {
    alert("Passwords do not match");
    return;
  }

  // 3️⃣ Prepare data to send to backend
  const userData = {
    name: name,
    sirname: sirname,
    email: email,
    password: password
  };

  console.log("📤 Sending data to backend:", userData);

  // 4️⃣ Send data to backend API
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("📥 Response from backend:", data);
      alert(data.message);
    })
    .catch(error => {
      console.error("❌ Error connecting to backend:", error);
      alert("Something went wrong. Please try again.");
    });
}
