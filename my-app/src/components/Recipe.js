import React from "react";

const Recipe = props => {
  const getIngredients = array => {
    let ingredients = [...array];
    return ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>;
    });
  };
  return (
    <div>
      {console.log(props.recipeViewState)}
      {props.recipeViewState ? 
      (<div>
      {console.log(props.recipeViewState)}
  
      <button type="submit" value={props.element.name}onClick ={props.toggleRecipeView} className="accordion">{props.element.name}</button>
      <div className="panel">
        <h3>Ingredients</h3>
        <ul>{getIngredients(props.element.ingredients)}</ul>
        <button
          value={props.recipe}
          onClick={props.handleDelete}
          type="submit"
          className="delete"
        >
          delete
        </button>
        <button onClick={props.handleEdit} type="submit" className="edit">
          edit
        </button>
      </div>
    </div> )
      :(
        <div>
      <h1 onClick ={props.toggleRecipeView}  className="accordion">{props.element.name}</h1>
      <div className="panel none">
        <h3>Ingredients</h3>
        <ul>{getIngredients(props.element.ingredients)}</ul>
        <button
          value={props.recipe}
          onClick={props.handleDelete}
          type="submit"
          className="delete"
        >
          delete
        </button>
        <button onClick={props.handleEdit} type="submit" className="edit">
          edit
        </button>
      </div>
      </div>)
     }
     </div>
     
  
  );
};

export default Recipe;
