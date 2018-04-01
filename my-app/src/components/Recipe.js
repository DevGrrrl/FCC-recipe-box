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
   
    <button type="submit" value={props.id}onClick ={props.toggleRecipeView} className="accordion">{props.element.name}</button>
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
        {/* {console.log('current recipe name ', props.recipe)} */}
        <EditRecipe handleIngredients ={props.handleIngredients} handleEditSubmit = {props.handleEditSubmit} name = {props.name} handleRecipeName = {props.handleRecipeName} recipe={props.recipe} ingredients={props.element.ingredients}editState = {props.editRecipeModalState}value={props.id}toggleEditModal={props.toggleEditModal}/>
      </div>
    </div> )
      :(
        <div>
      <button type="submit" value={props.id}onClick ={props.toggleRecipeView} className="accordion">{props.element.name}</button>
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
