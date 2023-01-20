getDetailData()

async function getDetailData() {
  const id = window.location.search.slice(6)
  const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`)
  const data = await response.json()
  const comments = await getComments(data.data.id)
  createPage(data.data, comments)
}

async function getComments(id) {
  const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`)
  return await response.json()
}

function createPage(data, comments) {
  const body = document.querySelector('.container')

  const h1 = document.createElement('h1')
  h1.textContent = data.title
  body.append(h1)

  const p = document.createElement('p')
  p.textContent = data.body
  body.append(p)

  const commentsTitle = document.createElement('h2')
  commentsTitle.textContent = 'Комментарии: ' + comments.data.length;
  body.append(commentsTitle)

  const commentsList = document.createElement('ul')
  commentsList.classList.add('list-group')
  body.append(commentsList)

  comments.data.forEach((item) => {
    commentsList.insertAdjacentHTML('beforeEnd',
    `<li class="list-group-item p-3">
           <div class="comment__name">
                Имя: ${item.name}
           </div>
           <div class="comment__email">
                Email: ${item.email}
           </div>
           <p class="p-2 pb-0 mb-0">
                ${item.body}
           </p>
        </li>`
    );
  })
}



