const postCreated = document.querySelector('#postCreated')
const createBtn = document.querySelector('#create')

const returnHome = () => {
    createBtn.classList.remove('is-loading')
    document.location.replace('/')
}

const postCreationHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#postTitle').value.trim()
    const body = document.querySelector('#postBody').value.trim()

    const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({
            post: { title, body, },
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    createBtn.classList.add('is-loading')
    postCreated.classList.remove('hide')

    return setTimeout(returnHome, 3000);
}

document
    .querySelector('#postForm')
    .addEventListener('submit', postCreationHandler)