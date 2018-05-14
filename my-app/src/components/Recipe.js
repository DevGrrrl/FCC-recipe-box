import React from "react";
import PropTypes from "prop-types";
import EditRecipeModal from "./EditRecipeModal";
import styled from "styled-components";

/* Style the buttons that are used to open and close the accordion panel */
const RecipeTitle = styled.button`
  background-color: white;
  color: #383838;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  font-family: "Roboto Mono", monospace;
  font-weight: 500;
  cursor: pointer;
  padding: 5%;
  width: 100%;
  display: block;
  margin: 0 auto;
  height: 10%;
  text-align: left;
  outline: none;
  font-size: 1.5rem;
  transition: 0.4s;
  &:nth-child(1) {
    border-radius: 5px 5px 0 0;
  }
  @media (min-width: 500px) {
    padding: 2%;
  }
`;

/* Style the accordion panel. Note: hidden by default */
const IngredientsList = styled.div`
  color: #383838;
  background-color: white;
  overflow: hidden;
  width: 90%;
  margin: auto;
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: "Roboto Mono", monospace;
`;
const IngredientsTitle = styled.h3`
  color: #383838;
  text-align: left;
  font-weight: 500;
  @media (min-width: 500px) {
    padding-left: 2%;
  }
`;

const Button = styled.button`
  background-color: #8650ff;
  box-shadow: 0 0 10px #bbb7b7;
  color: white;
  padding: 4%;
  text-align: center;
  border: none;
  border-radius: 12px;
  margin-right: 5%;
  outline: none;
  transition: 0.4s;
  font-size: 1.2rem;
  font-family: "Roboto Mono", monospace;

  @media (min-width: 500px) {
    padding: 1.5%;
  }
`;

const List = styled.li`
  list-style: none;
`;

const ListCont = styled.ul`
  padding-left: 5%;
`;

const RecipeBorderTop = styled.hr`
  background-color: #8650ff;
  height: 3px;
  border: none;
  margin: 0;
`;

const RecipeBorderBottom = styled.hr`
  background-color: #8650ff;
  height: 3px;
  border: none;
  margin-top: 5%;
  margin-bottom: 0;
`;
const RecipeContainer = styled.div``;

const TitleContainer = styled.div``;

const getIngredients = array => {
  let ingredients = [...array];
  return ingredients.map((ingredient, i) => {
    return <List key={i}>{ingredient}</List>;
  });
};

const Recipe = props => {
  return (
    <React.Fragment>
      {/* if recipeViewState is true, return the recipe in  */}
      {props.recipeViewState ? (
        <RecipeContainer>
          <RecipeTitle
            type="submit"
            value={props.element.id}
            onClick={props.toggleRecipeView}
          >
            {props.element.name}
          </RecipeTitle>
          <RecipeBorderTop />
          <IngredientsList>
            <IngredientsTitle>Ingredients</IngredientsTitle>
            <ListCont>{getIngredients(props.element.ingredients)}</ListCont>
            <Button
              value={props.element.id}
              onClick={props.handleDelete}
              type="submit"
              className="delete"
            >
              Delete
            </Button>
            <Button
              type="submit"
              value={props.value}
              id="myBtn"
              onClick={props.toggleEditModal}
            >
              Edit
            </Button>
            {props.editRecipeModalState ? <EditRecipeModal {...props} /> : null}
          </IngredientsList>
          <RecipeBorderBottom />
        </RecipeContainer>
      ) : (
        <TitleContainer>
          <RecipeTitle
            type="submit"
            value={props.element.id}
            onClick={props.toggleRecipeView}
          >
            {props.element.name}
          </RecipeTitle>
        </TitleContainer>
      )}
    </React.Fragment>
  );
};

export default Recipe;
