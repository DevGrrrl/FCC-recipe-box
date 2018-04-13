import React from "react";
import EditRecipe from './EditRecipe';

const Recipe = props => {
  const getIngredients = array => {
    let ingredients = [...array];
    return ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>;
    });
  };
  return (
    <div>
      {props.recipeViewState ? 
      (<div>
   
    <button type="submit" value={props.element.id}onClick ={props.toggleRecipeView} className="accordion">{props.element.name}</button>
      <div className="panel">
        <h3>Ingredients</h3>
        <ul>{getIngredients(props.element.ingredients)}</ul>
        <button
          value={props.element.id}
          onClick={props.handleDelete}
          type="submit"
          className="delete"
        >
          delete
        </button>
        <EditRecipe  {...props}/>
      </div>
    </div> )
      :(
        <div>
      <button type="submit" value={props.element.id}onClick ={props.toggleRecipeView} className="accordion">{props.element.name}</button>
      </div>)
      }
     </div>
     
  );
};

export default Recipe;
