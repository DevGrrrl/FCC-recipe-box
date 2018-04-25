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
  font-size: 1rem;
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
  font-size: 1rem;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalContent = styled.div `
  background-color: #fefefe;
  display: block;
  font-size: 1rem;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  background: #ffeded;
  width: 80%; /* Could be more or less, depending on screen size */
  `

  const Label = styled.label`
  display:block;
  font-size: 1rem;
 

`
const TextArea = styled.textarea `
  display:block;
  padding: 2%;
  font-size: 1rem;
`

const Input = styled.input `
  font-size: 1rem;
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 3%;
 
`

const Fieldset = styled.fieldset `
  border-width: 2px;
  border-style: solid;
  border-color: red;
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
              <Fieldset>
                <legend>Edit Recipe</legend>
                <Label htmlFor="enter-recipe-name">Recipe</Label>
                <TextArea
                  id="enter-recipe-name"
                  cols="35"
                  rows="1"
                  defaultValue={props.element.name}
                  onChange={props.handleRecipeName}
                  pattern="[-zA-Z0-9-]+"
                />
                <p>
                  <Label htmlFor="enter-recipe-ingredients">Ingredients</Label>
                  <TextArea
                    id="enter-recipe-ingredients"
                    cols="35"
                    rows="5"
                    defaultValue={props.element.ingredients}
                    onChange={props.handleIngredients}  
                    pattern="[-zA-Z0-9-]+"                />
                </p>
                <Input type="submit" value="Update Recipe" />
              </Fieldset>
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


