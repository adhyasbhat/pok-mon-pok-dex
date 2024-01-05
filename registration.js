function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}
async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("signupForm"));
    const username = formData.get('username');
    const password = formData.get('password');
    const repassword = formData.get('repassword');

    const request = {
        method: "POST",
        body: JSON.stringify({ username, password, repassword }),
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch("/createuser", request);
        const data = await response.json();

        if (data.error) {
            showMessage(data.error);
        } 
        else {
            localStorage.setItem("authenticate","allowed")
            window.location.href = "/index.html"; 
            // window.location.href = "/"; 
        }
    } catch (error) {
        console.error("Error:", error);
        showMessage("Error during signup");
    }
}
