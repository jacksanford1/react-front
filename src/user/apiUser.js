export const read = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, { // don't forget to return before fetch (most of the time)
    method: "GET",
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

export const update = (userId, token, user) => {
  console.log("USER DATA UPDATE: ", user);
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, { // don't forget to return before fetch (if using curly braces)
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: user // don't need to stringify the data anymore because we're sending form data now, not json data
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const remove = (userId, token) => { // we just copied the read method above and literally just the function name and the method to DELETE instead of GET
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, { // don't forget to return before fetch (most of the time)
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

export const list = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users`, { // don't forget to return before fetch (most of the time)
    method: "GET"
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const updateUser = (user, next) => { // this method is so that the X's Profile header on the navbar updates when a user edits their profile
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt'))
      auth.user = user // jwt has two fields, token and user, so we are basically saying we want to access user
      localStorage.setItem('jwt', JSON.stringify(auth)) // changing the jwt token for whatever updated fields the user edited and saved
      next()
    }
  }
}

export const follow = (userId, token, followId) => { // these three things are being sent in from the callAPI function within clickFollowButton in Profile.js
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, { // don't forget to return before fetch (most of the time)
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userId, followId}) // don't need to stringify the data anymore because we're sending form data now, not json data
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
}

export const unfollow = (userId, token, unfollowId) => { // these three things are being sent in from the callAPI function within clickFollowButton in Profile.js
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, { // don't forget to return before fetch (most of the time)
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, unfollowId }) // don't need to stringify the data anymore because we're sending form data now, not json data
  })
  .then(response => {
    return response.json() // for some reason this is necessary to get the actual data, otherwise you just get a success/error thing
  })
  .catch(err => console.log(err))
};

export const findPeople = (userId, token) => { // these three things are being sent in from the callAPI function within clickFollowButton in Profile.js
  return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`, { // don't forget to return before fetch (most of the time)
    method: "GET",
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
};
