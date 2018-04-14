import React from "react";
import styled from 'styled-components';


const Edit = styled.button`
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
const EditModal = props => {

  return (
    <div>
      <Edit type="submit" value = {props.value} id="myBtn" onClick={props.toggleEditModal}>
        Edit
      </Edit>
      {props.editRecipeModalState ? (
        <Modal id="myModal" className="modal">
          <ModalContent className="modal-content">
            <span onClick = {props.toggleEditModal}  className="close">&times;</span>
            <form
              onSubmit={e => {
                props.handleEditSubmit(e);
              }}
            >
              <fieldset>
                <legend>Edit Recipe</legend>
                <Label htmlFor="enter-recipe-name">Recipe</Label>
                <TextArea
                  id="enter-recipe-name"
                  cols="35"
                  rows="1"
                  defaultValue={props.element.name}
                  onChange={props.handleRecipeName}
                />
                <p>
                  <Label htmlFor="enter-recipe-ingredients">Ingredients</Label>
                  <TextArea
                    id="enter-recipe-ingredients"
                    cols="35"
                    rows="5"
                    defaultValue={props.element.ingredients}
                    onChange={props.handleIngredients}                  />
                </p>
                <input type="submit" value="Submit" />
              </fieldset>
            </form>
          </ModalContent>
        </Modal>
      ) : (
     
        <div />
      )}
    </div>
  );
};

export default EditModal;


