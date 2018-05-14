import React from "react";
import styled from "styled-components";

const Modal = styled.div`
  /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  font-size: 1rem;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const ModalContent = styled.div`
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

const Legend = styled.legend`
  font-size: 1.5rem;
  color: #383838;
  font-weight: 500;
  margin: auto;
`;
const EditModal = props => {
  console.log(props.ingredientsModified);

  const buttonIsDisabled = (
    nameModified,
    ingredientsModified,
    errorsName,
    errorsIngredients
  ) => {
    if (!nameModified && !ingredientsModified) {
      return false;
    } else {
      if (!nameModified) {
        if (errorsIngredients) {
          console.log("errorIng", errorsIngredients);
          return true;
        } else {
          return false;
        }
      } else {
        if (errorsName) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  return (
    <div>
      <Modal id="myModal" className="modal">
        <ModalContent className="modal-content">
          <span onClick={props.toggleEditModal} className="close">
            &times;
          </span>
          <form
            onSubmit={e => {
              props.handleEditSubmit(e);
            }}
          >
            <Fieldset>
              <Legend>Edit Recipe</Legend>
              <Hr />
              <Label htmlFor="enter-recipe-name">Recipe</Label>
              <TextArea
                id="enter-recipe-name"
                cols="35"
                rows="1"
                defaultValue={props.element.name}
                onChange={props.handleRecipeName}
                className={
                  props.nameModified
                    ? props.errors.name
                      ? "error"
                      : "no-error"
                    : "no-error"
                }
              />
              <p>
                <Label htmlFor="enter-recipe-ingredients">Ingredients</Label>
                <TextArea
                  id="enter-recipe-ingredients"
                  cols="35"
                  rows="5"
                  defaultValue={props.element.ingredients}
                  onChange={props.handleIngredients}
                  className={
                    props.ingredientsModified
                      ? props.errors.ingredients
                        ? "error"
                        : "no-error"
                      : "no-error"
                  }
                />
              </p>
              <Input
                className={
                  buttonIsDisabled(
                    props.nameModified,
                    props.ingredientsModified,
                    props.errors.name,
                    props.errors.ingredients
                  )
                    ? "disabled"
                    : "enabled"
                }
                type="submit"
                value="Update Recipe"
                disabled={buttonIsDisabled(
                  props.nameModified,
                  props.ingredientsModified,
                  props.errors.name,
                  props.errors.ingredients
                )}
              />
            </Fieldset>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditModal;
