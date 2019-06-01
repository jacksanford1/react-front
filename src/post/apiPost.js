

export const create = (userId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, { // don't forget to return before fetch (most of the time)
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: post // don't need to stringify the data anymore because we're sending form data now, not json data
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
};

export const list = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/posts`, { // don't forget to return before fetch (most of the time)
    method: "GET",
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const singlePost = postId => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: "GET"
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err));
};

export const listByUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`, { // don't forget to return before fetch (most of the time)
    method: "GET",
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const remove = (postId, token) => { // we just copied the read method above and literally just the function name and the method to DELETE instead of GET
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, { // don't forget to return before fetch (most of the time)
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const update = (postId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, { // don't forget to return before fetch (if using curly braces)
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: post // don't need to stringify the data anymore because we're sending form data now, not json data
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const like = (userId, token, postId) => { // need to know which user liked which post
  return fetch(`${process.env.REACT_APP_API_URL}/post/like`, { // don't forget to return before fetch (if using curly braces)
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userId, postId}) // need to stringify because this isn't form data anymore
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const unlike = (userId, token, postId) => { // need to know which user liked which post
  return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, { // don't forget to return before fetch (if using curly braces)
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userId, postId}) // need to stringify because this isn't form data anymore
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const comment = (userId, token, postId, comment) => { // need to know which user liked which post
  return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, { // don't forget to return before fetch (if using curly braces)
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, comment }) // need to stringify because this isn't form data anymore
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const uncomment = (userId, token, postId, comment) => { // need to know which user liked which post
  return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, { // don't forget to return before fetch (if using curly braces)
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, comment }) // need to stringify because this isn't form data anymore
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}
