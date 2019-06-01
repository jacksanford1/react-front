export const signup = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/signup`, { // this is how we post to the backend, specifically to the /signup page
    method: "POST", // specifying this is a POST request
    headers: {
      Accept: "application/json", // don't need to specify usually but it's good practice
      "Content-Type": "application/json" // don't need to specify usually but it's good practice
    },
    body: JSON.stringify(user) // can't just send the user info by itself, need to JSON stringify
  })
  .then(response => { // if successful, return the response we have created on the backend
    return response.json() // this should say something like "Signup successful!"
  })
  .catch(err => console.log(err)) // print out the error in the case of an error
}

export const signin = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST", // specifying this is a POST request
      headers: {
        Accept: "application/json", // don't need to specify usually but it's good practice
        "Content-Type": "application/json" // don't need to specify usually but it's good practice
      },
      body: JSON.stringify(user) // can't just send the user info by itself, need to JSON stringify
    })
    .then(response => { // if successful, return the response we have created on the backend
      return response.json() // this should say something like "Signup successful!"
    })
    .catch(err => console.log(err)) // print out the error in the case of an error
  }

export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined") { // making sure window is available in the browser (sometimes it takes a sec to load)
      localStorage.setItem("jwt", JSON.stringify(jwt)) // localStorage provides you two methods: setItem and getItem, also need to stringify what we get before we can put it in local storage
      next() // the next variable we take in for the authenticate function is going to be a function, as you can see in the authenticate user portion of clickSubmit, we will be passing in the function that sets redirectToReferrer as true
    }
  }

export const signout = (next) => { // delets token in local storage and also makes an api call to invalidate the user's signin
  if(typeof window !== "undefined") localStorage.removeItem("jwt") // typeof window not equal undefined just means that the page is loaded and the window object is available, jwt is the key under which the value "token" is stored in local storage
  next() // this will redirect the user
  return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
    method: "GET"
  })
  .then(response => {
    console.log('signout', response)
    return response.json()
  })
  .catch(err => console.log(err))
}

export const isAuthenticated = () => { // checks to see if a user is authenticated or not
  if(typeof window == "undefined") { // makes sure the window object is availabe
    return false
  }

  if(localStorage.getItem("jwt")) { // if there is a jwt token in the local storage (means a user is loggen in)
    return JSON.parse(localStorage.getItem("jwt")) // returns us the parsed jwt item
  } else {
    return false
  }
}

export const forgotPassword = email => {
    console.log("email: ", email);
    return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log("forgot password response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const socialLogin = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // credentials: "include", // works only in the same origin
        body: JSON.stringify(user)
    })
        .then(response => {
            console.log("signin response: ", response);
            return response.json();
        })
        .catch(err => console.log(err));
};
