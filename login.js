function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}
async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("loginForm"));
    const username = formData.get('username');
    const password = formData.get('password');
  

    const request = {
        method: "POST",
        body: JSON.stringify({ username, password}),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch("/login", request);
        const data = await response.json();
        if(response.ok) {
            localStorage.setItem("authenticate","allowed")
            window.location.href = "/index.html"; 
        }
        else{
            showMessage(data.error);
        } 
        
    } catch (error) {
        console.error("Error:", error);
        showMessage("Error during signup");
    }
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }