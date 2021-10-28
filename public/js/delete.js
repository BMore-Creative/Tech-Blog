const deleteBtn = document.querySelector('#delete')
const cancelBtn = document.querySelector('#cancel')
const postDeleted = document.querySelector('#postDeleted')

const returnHome = () => {
    deleteBtn.classList.remove('is-loading')
    document.location.replace('/profile')
}

const postDeleteHandler = async (event) => {
    event.preventDefault()

    const id = document.querySelector('#id').value.trim()

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    })

    deleteBtn.classList.add('is-loading')
    cancelBtn.disabled = true
    postDeleted.classList.remove('hide')

    return setTimeout(returnHome, 3000);
}

deleteBtn.onclick = postDeleteHandler;