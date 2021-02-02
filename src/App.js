import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
  //URL for localhost connecting to database
  //const url = "http://localhost:4500"
  const url = "https://anny1207dogs.herokuapp.com"

  //EMPTY DOG OBJECT ... for resetting form purpose.
  const emptyDog = {
    name: "",
    age: 0,
    img: "",
  };

  // MAKE A STATE TO HOLD THE LIST OF DOGS
  const [dogs, setDogs] = React.useState([])

  // MAKE A STATE TO TRACK WHICH DOG TO EDIT
  const [selectedDog, setSelectedDog] = React.useState(emptyDog)


  //handleCreate function for cerating dogs
const handleCreate = (newDog) => {
  //to use the POST method, the fetch function must take in a 2nd parameter
  // /... which is an object with a 'method' key and a 'headers' key
  fetch(url + '/dog', {
    method: 'post',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(newDog)
  })
  .then( () => {
    getDogs()
  })
}

//function to set selected dog when you clicked on
const selectDog = (dog) => {
  setSelectedDog(dog)
}

//handleUpdate function for updating dogs
const handleUpdate = (dog) => {
  fetch(url + "/dog/" + dog._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog),
  }).then(() => {
    // don't need the response from the post but will be using the .then() to update the list of dogs
    getDogs();
  });
};

  // Deletes a dog
  const deleteDog = (dog) => {
    fetch(url + "/dog/" + dog._id, {
      method: "delete"
    })
    .then(() => {
      getDogs()
    })
  }

  // Function to get list of dogs
  const getDogs = () => {
    fetch(url + "/dog")
    .then(response => response.json())
    .then(data => {
      setDogs(data)
    })
  }
  // fetch dogs when page loads
  React.useEffect(() => {
    getDogs()
  }, [])

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <Link to="/create">
        <button>Create a Dog</button>
      </Link>
      <hr />
      <main>
        <Switch>
          <Route 
            exact path="/" 
            render={(rp) => <Display {...rp} dogs={dogs} selectDog={ selectDog} deleteDog={deleteDog} />} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={ handleCreate } />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={ handleUpdate } />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
