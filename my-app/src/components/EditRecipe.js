import React from "react";

const EditModal = props => {

  return (
    <div>
      <button type="submit" value = {props.value} id="myBtn" onClick={props.toggleEditModal}>
        Edit
      </button>
     
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
                  placeholder={props.recipe}
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
                    placeholder={props.ingredients}
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


