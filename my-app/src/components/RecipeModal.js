import React from "react";
import styled from 'styled-components';


const ModalContainer = styled.div`
  width: 90%;
  margin: auto;
`

const AddRecipe = styled.button`
  background-color: #b5b3b3;
  color: #444;
  cursor: pointer;
  padding: 3%;
  width: 45%;
  margin-top: 1%;
  margin-bottom: 1%;
  text-align: center;
  border: none;
  outline: none;
  transition: 0.4s;
  border-radius: 10px;
  @media (min-width: 700px) {
     width: 20%;
     padding: 0.5%;
 }
  
`

const Modal = styled.div`
  /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalContent = styled.div `
  background-color: #fefefe;
  display: block;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  background: #ffeded;
  width: 80%; /* Could be more or less, depending on screen size */
`
const Label = styled.label`
  display:block;
 

`
const TextArea = styled.textarea `
  display:block;
  padding: 2%;
`
const RecipeModal = props => {
  return (
    <ModalContainer>
      <AddRecipe type="submit" id="myBtn" onClick={props.toggleAddRecipeModal}>
        Add New Recipe
      </AddRecipe>

      {props.addRecipeModalState ? (
        <Modal id="myModal" className="modal">
          <ModalContent className="modal-content">
            <span onClick = {props.toggleAddRecipeModal}className="close">&times;</span>
            <form
              onSubmit={e => {
                props.handleRecipeSubmit(e);
              }}
            >
              <fieldset>
                <legend>Add A Recipe</legend>
                <Label htmlFor="enter-recipe-name">Recipe</Label>
                <TextArea
                  id="enter-recipe-name"
                  cols="35"
                  rows="1"
                  value={props.name}
                  placeholder="recipe name"
                  onChange={props.handleRecipeName}
                  pattern="[-zA-Z0-9-]+"
                />
                <p>
                  <Label htmlFor="enter-recipe-ingredients">Ingredients</Label>
                  <TextArea
                    id="enter-recipe-ingredients"
                    cols="35"
                    rows="5"
                    value={props.ingredients}
                    onChange={props.handleIngredients}
                    placeholder="Enter the ingredients separated by a comma"
                    pattern="[-zA-Z0-9-]+"
                  />
                </p>
                <input type="submit" value="Add Recipe" />
              </fieldset>
            </form>
          </ModalContent>
        </Modal>
      ) : (
        <div/>
  )
}
</ModalContainer>
  )}

export default RecipeModal;
