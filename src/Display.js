import React from "react";

const Display = (props) => {
  
  // Destructuring dogs from props
  const {dogs} = props

  //loading function for if dog exist
  const loaded = () => {
    return (
      <div style = {{textAlign: "center"}} >

        {dogs.map ( dog => {

          return (
            <article key={dog._id}>
              <img src={dog.img} />
              <h1>Name: {dog.name}</h1>
              <h3>Age: {dog.age}</h3>
              <button onClick={() => {
                  props.selectDog(dog)
                  {/* push() takes you to the Form component to edit */}
                  props.history.push('/edit')
                }}>
                Edit Dog
              </button>
              <button onClick={ () => {
                props.deleteDog(dog)
                {/*  No need to push since you are staying on same page */}
              }}>
              Delete Dog
              </button>
            </article>
          )

        })}

      </div>
    )
  }

  const loading = <h1>Loading...</h1>

  return dogs.length > 0 ? loaded() : loading; 

};

export default Display;
