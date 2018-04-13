import React from "react";
import EditRecipe from './EditRecipe';
import styled from 'styled-components';

/* Style the buttons that are used to open and close the accordion panel */
const RecipeTitle = styled.button`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 5%;
  width: 90%;
  display: block;
  margin: auto;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
  @media (min-width: 700px) {
    width: 90%;
    padding: 2%;
}
`

/* Style the accordion panel. Note: hidden by default */
const IngredientsList = styled.div`
  background-color: white;
  overflow: hidden;
  width: 90%;
  margin: auto;
`
const IngredientsTitle = styled.h3`
  
`

const Delete = styled.button`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 3%;
  width: 25%;
  text-align: center;
  border: none;
  outline: none;
  transition: 0.4s;
  @media (min-width: 700px) {
     width: 8%;
     padding: 1%;
 }
  
`

const Recipe = props => {
  const getIngredients = array => {
    let ingredients = [...array];
    return ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>;
    });
  };
  return (
    <React.Fragment>
      {props.recipeViewState ? 
      (<div>
   
    <RecipeTitle type="submit" value={props.element.id}onClick ={props.toggleRecipeView} >{props.element.name}</RecipeTitle>
      <IngredientsList>
        <IngredientsTitle>Ingredients</IngredientsTitle>
        <ul>{getIngredients(props.element.ingredients)}</ul>
        <Delete
          value={props.element.id}
          onClick={props.handleDelete}
          type="submit"
          className="delete"
        >
          Delete
        </Delete>
        <EditRecipe  {...props}/>
      </IngredientsList>
    </div> )
      :(
        <div>
      <RecipeTitle type="submit" value={props.element.id}onClick ={props.toggleRecipeView} >{props.element.name}</RecipeTitle>
      </div>)
      }
     </React.Fragment>
     
  );
};

export default Recipe;
