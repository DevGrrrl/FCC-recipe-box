import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ModalContainer = styled.div`
  width: 90%;
  margin: auto;
 
`;

const AddRecipe = styled.button`
  background-color: #8650ff;
  box-shadow: 0 0 10px #bbb7b7;
  color: white;
  font-family: "Roboto Mono", monospace;
  padding: 4%;
  margin-top: 3%;
  margin-bottom: 3%;
  text-align: center;
  border: none;
  outline: none;
  transition: 0.4s;
  border-radius: 12px;
  font-size: 1.2rem;
  @media (min-width: 500px) {
    width: 20%;
    padding: 0.5%;
  }
`;

const Modal = styled.div`
  /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
  /* display: block; */
  margin: 15% auto;
  padding: 20px;
  background-color: white;
  width: 85%;
`;
const Label = styled.label`
  display: block;
  font-size: 1.5rem;
  font-weight: 500;
  color: #383838;
  margin: 4%;
`;
const TextArea = styled.textarea`
  display: block;
  padding: 3%;
  border-radius: 12px;
  font-size: 1.2rem;
  width: 90%;
  margin: auto;
  color: #383838;
  font-family: "Roboto Mono", monospace;
`;

const Input = styled.input`
  font-size: 1.2rem;
  font-family: "Roboto Mono", monospace;
  color: white;
  background-color: #8650ff;
  border: none;
  border-radius: 12px;
  box-shadow: 0 0 10px #bbb7b7;
  padding: 4%;
`;

const Legend = styled.legend`
  font-size: 1.5rem;
  color: #383838;
  font-weight: 500;
  margin: auto;
`;

// const CloseModal = styled.button`
//   margin-top: -15%;
//   height: 30px;
//   color: #8650ff;
//   background-color: white;
//   border: none;
//   border-radius: 12px;
//   font-size: 2.5rem;
//   padding: 2%;
// `;
const Fieldset = styled.fieldset`
  display: block;
  padding: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: auto;
  border: none;
`;

const Hr = styled.hr`
  background-color: #d9d9d9;
  height: 1px;
  border: none;
  margin-top: 5%;
  margin-bottom: 0;
`;

const RecipeModal = props => {
  return (
    <ModalContainer>
      <AddRecipe type="submit" onClick={props.toggleAddRecipeModal}>
        Add
      </AddRecipe>
      {/* IF addRecipeModalState is true, return the add recipe modal  */}
      {props.addRecipeModalState && (
        <Modal>
          <ModalContent>
               {/* closeAddRecipeModal */}
               <span
                  onClick={props.toggleAddRecipeModal}
                  className="close"
                >
                  &times;
                </span>
            <form
              onSubmit={e => {
                props.handleRecipeSubmit(e);
              }}
            >
              <Fieldset>
                <Legend>Add Recipe </Legend>
                <Hr />
                <Label htmlFor="enter-recipe-name">Recipe</Label>
                <TextArea
                  id="enter-recipe-name"
                  cols="35"
                  rows="1"
                  maxLength ="24"
                  value={props.name}
                  placeholder="Recipe name"
                  onChange={props.handleRecipeName}
                  pattern="[-zA-Z0-9-]+"
                  className={props.errors.name ? "error" : "no-error"}
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
                    className={props.errors.ingredients ? "error" : "no-error"}
                  />
                </p>
                <Input
                  className={
                    props.errors.ingredients || props.errors.name
                      ? "disabled"
                      : "enabled"
                  }
                  disabled={!props.addIsEnabled}
                  type="submit"
                  value="Add Recipe"
                />
              </Fieldset>
            </form>
          </ModalContent>
        </Modal>
      )}
    </ModalContainer>
  );
};

export default RecipeModal;
