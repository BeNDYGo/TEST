const server = 'https://880f-5-196-64-200.ngrok-free.app'

async function safeJson(response, context = '') {
    const contentType = response.headers.get('content-type') || ''
    const label = context ? `[${context}] ` : ''
    if (!contentType.includes('application/json')) {
        try {
            const body = await response.text()
            console.error(`${label}Non-JSON response`, {
                status: response.status,
                statusText: response.statusText,
                contentType,
                url: response.url,
                body
            })
        } catch (err) {
            console.error(`${label}Non-JSON response`, {
                status: response.status,
                statusText: response.statusText,
                contentType,
                url: response.url,
                error: err
            })
        }
        return null
    }
    try {
        const data = await response.json()
        if (!response.ok) {
            console.error(`${label}API error response`, {
                status: response.status,
                statusText: response.statusText,
                data
            })
        }
        return data
    } catch (err) {
        console.error(`${label}Failed to parse JSON`, err)
        return null
    }
}

document.getElementById('header-container').innerHTML = `
        <div class='header'>
        <div class='logo' onclick='goToMain()'>TEST</div>
        <div class='navigation'>
            <button class='headers-btn' onclick='goToTasks()'>Задания</button>
            <button class='headers-btn' onclick='goToPVP()'>PVP</button>
        </div>
        <div id='auth-section'>
            <button class='headers-btn' onclick='goToRegister()'>Регистрация</button>
            <button class='headers-btn' onclick='login()'>Войти</button>
        </div>
        </div>
`

function goToMain() {
    window.location.href = 'main.html'
}
function goToPVP() {
    window.location.href = 'pvp.html'
}
function goToAdmin() {
    window.location.href = 'admin.html'
}
async function checkAdmin() {
    const username = localStorage.getItem('username')
    if (!username) {
        return
    }
    try {
        const response = await fetch(server + '/api/userInfo?username=' + username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        })
        const data = await safeJson(response, 'checkAdmin')
        if (!response.ok || !data) {
            return
        }
        if (data.role === 'admin') {
            document.getElementById('auth-section').innerHTML += `
                <button class='headers-btn' onclick='goToAdmin()'>Админ панель</button>
            `;
        }
    } catch (err) {
        console.error('[checkAdmin] Request failed', err)
    }
}

document.addEventListener('DOMContentLoaded', checkAdmin)
