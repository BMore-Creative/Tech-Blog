const loginFailed = document.querySelector('#loginFailed')
const repeatUsername = document.querySelector('#repeatUsername')
const confirmFailed = document.querySelector('#confirmFailed')

const loginFormHandler = async (event) => {
    event.preventDefault();
    loginFailed.classList.add('hide');

    const username = document.querySelector('#username').value.trim()
    const password = document.querySelector('#password').value.trim()

    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
        return loginFailed.classList.remove('hide')
    }

    return document.location.replace('/')
}

const registerFormHandler = async (event) => {
    event.preventDefault();
    repeatUsername.classList.add('hide');
    confirmFailed.classList.add('hide');

    const username = document.querySelector('#newUsername').value.trim();
    const password = document.querySelector('#newPassword').value.trim();
    const confirmPass = document.querySelector('#confirmPassword').value.trim();

    if (password !== confirmPass) {
        return confirmFailed.classList.remove('hide');
    }

    const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
        return repeatEmail.classList.remove('hide')
    }

    return document.location.replace('/')
}

document
    .querySelector('#loginForm')
    .addEventListener('submit', loginFormHandler)

document
    .querySelector('#registerForm')
    .addEventListener('submit', registerFormHandler)
