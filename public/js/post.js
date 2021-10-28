const postCommentHandler = async (event) => {
  event.preventDefault();

  const post_id = document.querySelector("#id").value.trim();
  const body = document.querySelector("#commentBody").value.trim();

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
        comment: { post_id, body, },
    }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response);

  document.location.reload();
};

document
  .querySelector("#newCommentForm")
  .addEventListener("submit", postCommentHandler);
