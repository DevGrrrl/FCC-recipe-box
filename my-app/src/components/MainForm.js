import React from "react";
import render from "react-dom";
import Recipe from "./Recipe";
import RecipeModal from "./RecipeModal";

class MainForm extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: JSON.parse(localStorage.getItem("recipes")) || [
        { name: "pie", ingredients: ["pastry", "oil", "carrots"], view: false },
        {
          name: "lunch",
          ingredients: ["pastry", "oil", "carrots"],
          view: false
        },
        {
          name: "dinner",
          ingredients: ["pastry", "oil", "carrots"],
          view: false
        }
      ],
      addIngredients: "",
      addName: "",
      addRecipeModalState: false,
      recipeViewState: false
    };

    this.handleRecipeName = this.handleRecipeName.bind(this);
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
    this.createNewRecipe = this.createNewRecipe.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteRecipes = this.deleteRecipes.bind(this);
    this.toggleAddRecipeModal = this.toggleAddRecipeModal.bind(this);
    this.toggleRecipeView = this.toggleRecipeView.bind(this);
  }

  toggleRecipeView(e) {
    e.preventDefault();
    //map through recipes and set toggle view
    
    console.log(e.target.value)
    this.setState({
      recipeViewState: !this.state.recipeViewState
    });
  }
  toggleAddRecipeModal(e) {
    e.preventDefault();
    this.setState({
      addRecipeModalState: !this.state.addRecipeModalState
    });
  }
  deleteRecipes(name, recipes, cb) {
    //delete via key instead
    let newArr = [];
    let filtered = recipes;
    filtered = filtered.filter(e => {
      return !(e.name === name);
    });
    cb(filtered);
  }

  handleDelete(e) {
    e.preventDefault();
    const name = e.target.value;
    let recipes = [...this.state.recipes];
    let newArr;
    this.deleteRecipes(name, recipes, function(res) {
      newArr = res;
    });

    localStorage.setItem("recipes", JSON.stringify(newArr));

    this.setState({
      recipes: JSON.parse(localStorage.getItem("recipes"))
    });
  }

  handleEdit(e) {
    e.preventDefault();
    console.log("Edit clicked");
  }

  handleRecipeName(e) {
    const value = e.target.value;
    this.setState({
      addName: value
    });
  }

  handleIngredients(e) {
    const value = e.target.value;
    this.setState({
      addIngredients: value
    });
  }

  createNewRecipe(cb) {
    let ingredients = this.state.addIngredients;
    ingredients = ingredients.split(",");
    const name = this.state.addName;
    let recipes = this.state.recipes;
    const newRecipe = {
      name: name,
      ingredients: ingredients,
      view: false
    };
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    cb(recipes);
  }

  handleRecipeSubmit(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    this.createNewRecipe(recipes => {
      const updatedRecipes = recipes;
      this.setState({
        recipes: updatedRecipes,
        addName: "",
        addIngredients: ""
      });
    });
  }

  render() {
    const getRecipes = recipes => {
      return recipes.map((elem, i) => {
        return (
          <Recipe
            key={i}
            recipe={elem.name}
            element={elem}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            toggleRecipeView={this.toggleRecipeView}
            recipeViewState={this.state.recipeViewState}
          />
        );
      });
    };

    return (
      <div>
        <div>{getRecipes(this.state.recipes)}</div>
        <RecipeModal
          toggleAddRecipeModal={this.toggleAddRecipeModal}
          addRecipeModalState={this.state.addRecipeModalState}
          ingredients={this.state.addIngredients}
          name={this.state.addName}
          handleRecipeName={this.handleRecipeName}
          handleIngredients={this.handleIngredients}
          handleRecipeSubmit={this.handleRecipeSubmit}
        />
      </div>
    );
  }
}

export default MainForm;
