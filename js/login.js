const server = 'https://880f-5-196-64-200.ngrok-free.app'

async function safeJson(response) {
    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
        return null
    }
    try {
        return await response.json()
    } catch (err) {
        return null
    }
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault()
    
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const messageDiv = document.getElementById('message')
    
    try {
        const response = await fetch(server + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        
        const result = await safeJson(response)
        if (!result) {
            messageDiv.textContent = 'Ошибка сервера'
            messageDiv.style.color = 'red'
            return
        }
        
        if (response.ok) {
            localStorage.setItem('username', username)
            window.location.href = 'main.html'
        } else {
            messageDiv.textContent = result.error
            messageDiv.style.color = 'red'
        }
    } catch (error) {
        messageDiv.textContent = 'Error: ' + error.message
        messageDiv.style.color = 'red'
    }
})
