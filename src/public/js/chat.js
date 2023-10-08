document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault()
    const user = document.getElementById("user").value
    const message = document.getElementById("textMessage").value
    
    try {
       const response = await fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({user, message})
        })
        if (response.ok) {
            const responseData = await response.json();
            const successMessage = responseData.message;
        
            console.log(successMessage);
            document.getElementById("user").value = ""; 
            document.getElementById("textMessage").value = ""; 
        } else {
            console.error("Error al enviar el mensaje");
        }
    } catch (error) {
        console.error("Error al enviar el mensaje: " + error.message);    }
})

