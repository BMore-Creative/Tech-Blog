const postEdited = document.querySelector('#postEdited')
const editBtn = document.querySelector('#edit')

const returnHome = () => {
    editBtn.classList.remove('is-loading')
    document.location.replace('/')
}

const postEditHandler = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#postTitle').value.trim()
    const body = document.querySelector('#postBody').value.trim()
    const id = document.querySelector('#id').value.trim()

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post: { title, body },
        }),
        headers: { 'Content-Type': 'application/json' },
    })

    editBtn.classList.add('is-loading')
    postEdited.classList.remove('hide')

    return setTimeout(returnHome, 3000);
}

document
    .querySelector('#editForm')
    .addEventListener('submit', postEditHandler)