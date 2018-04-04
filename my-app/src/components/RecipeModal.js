import React from "react";

const RecipeModal = props => {
  return (
    <div>
      <button type="submit" id="myBtn" onClick={props.toggleAddRecipeModal}>
        Add Recipe
      </button>

      {props.addRecipeModalState ? (
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span onClick = {props.toggleAddRecipeModal}className="close">&times;</span>
            <form
              onSubmit={e => {
                props.handleRecipeSubmit(e);
              }}
            >
              <fieldset>
                <legend>Add A Recipe</legend>
                <label htmlFor="enter-recipe-name">Recipe</label>
                <textarea
                  id="enter-recipe-name"
                  cols="100"
                  rows="1"
                  value={props.name}
                  placeholder="recipe name"
                  onChange={props.handleRecipeName}
                />
                <p>
                  <label htmlFor="enter-recipe-ingredients">Ingerdients</label>
                  <textarea
                    id="enter-recipe-ingredients"
                    cols="100"
                    rows="5"
                    value={props.ingredients}
                    onChange={props.handleIngredients}
                    placeholder="Enter the ingredients separated by a comma"
                  />
                </p>
                <input type="submit" value="Add Recipe" />
              </fieldset>
            </form>
          </div>
        </div>
      ) : (
        <div id="myModal" className="modal none"></div>
  )
}
</div>
  )}

export default RecipeModal;
