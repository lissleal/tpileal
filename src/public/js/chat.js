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
            body: JSON.stringify(user, message)
        })
        if (response.ok){
            const responseData = await response.json()
            const succesMessage = responseData.message

            console.log(succesMessage)
            userInputElement.value = ``;
            messageInputElement.value = ``;
        } else {
            console.error(`error al enviar el mensaje 1`)
        }
    } catch (error) {
            console.error(`error al enviar el mensaje 2`)
    }
})

