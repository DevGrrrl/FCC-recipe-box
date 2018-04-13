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

const EditModal = props => {

  return (
    <div>
      <Edit type="submit" value = {props.value} id="myBtn" onClick={props.toggleEditModal}>
        Edit
      </Edit>
      {props.editRecipeModalState ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span onClick = {props.toggleEditModal}  className="close">&times;</span>
            <form
              onSubmit={e => {
                props.handleEditSubmit(e);
              }}
            >
              <fieldset>
                <legend>Edit Recipe</legend>
                <label htmlFor="enter-recipe-name">Recipe</label>
                <textarea
                  id="enter-recipe-name"
                  cols="100"
                  rows="1"
                  value={props.name}
                  placeholder={props.element.name}
                  onChange={props.handleRecipeName}
                />
                <p>
                  <label htmlFor="enter-recipe-ingredients">Ingredients</label>
                  <textarea
                    id="enter-recipe-ingredients"
                    cols="100"
                    rows="5"
                    value={props.addIngredients}
                    onChange={props.handleIngredients}
                    placeholder={props.element.ingredients}
                  />
                </p>
                <input type="submit" value="Submit" />
              </fieldset>
            </form>
          </div>
        </div>
      ) : (
     
        <div />
      )}
    </div>
  );
};

export default EditModal;


