import React from "react";
import Recipe from "./Recipe";
import RecipeModal from "./RecipeModal";
import RecipeList from './RecipeList';

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: JSON.parse(localStorage.getItem("recipes")) || [
        {
          id: 0,
          name: "Cherry Pie",
          ingredients: ["pastry", "cherries", "sugar"],
          view: false
        },
        {
          id: 1,
          name: "Roast Dinner",
          ingredients: ["potatoes", "peas", "kale", "carrots", "nuts", "herbs"],
          view: false
        },
        {
          id: 2,
          name: "Dhal",
          ingredients: ["lentils", "spices", "tomato paste"],
          view: false
        }
      ],
      addIngredients: "",
      addName: "",
      addRecipeModalState: false,
      editRecipeModalState: false,
      currentRecipe: 0
    };

    this.handleRecipeName = this.handleRecipeName.bind(this);
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
    this.createNewRecipe = this.createNewRecipe.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteRecipes = this.deleteRecipes.bind(this);
    this.toggleAddRecipeModal = this.toggleAddRecipeModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleRecipeView = this.toggleRecipeView.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }

  changeState(e, cb) {
    let id = e.target.value;
    let recipes = [...this.state.recipes];
    let newArr = recipes.map(elem => {
      if (Number(elem.id) === Number(id)) {
        elem.view = !elem.view;
        return elem;
      } else {
        elem.view = false;
        return elem;
      }
    });
    cb(newArr);
  }
  toggleRecipeView(e) {
    e.preventDefault();
    this.changeState(e, res => {
      this.setState({
        recipes: res,
        currentRecipe: e.target.value
      });
    });
  }

  toggleAddRecipeModal(e) {
    e.preventDefault();
    this.setState({
      addRecipeModalState: !this.state.addRecipeModalState
    });
  }

  toggleEditModal(e) {
    e.preventDefault();
    this.setState({
      editRecipeModalState: !this.state.editRecipeModalState,
    })
  }

  deleteRecipes(id, recipes, cb) {
    let filteredRecipes = recipes;
    filteredRecipes = filteredRecipes.filter(recipe => {
      return !(Number(recipe.id) === Number(id));
    });
    cb(filteredRecipes);
  }

  handleDelete(e) {
    e.preventDefault();
    const id = e.target.value;
    let recipes = [...this.state.recipes];
    let newRecipes;
    this.deleteRecipes(id, recipes, function(res) {
      newRecipes = res;
    });
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    this.setState({
      recipes: JSON.parse(localStorage.getItem("recipes"))
    });
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
    
    //generate unique id
    const recipes = this.state.recipes;
    const length = this.state.recipes.length;
    let lastId;
    if((this.state.recipes).length>0){
      lastId = this.state.recipes[length - 1].id;
    } else {
      lastId = 0;
    }
   
    const newRecipe = {
      id: lastId + 1,
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
    this.createNewRecipe(recipes => {
      const updatedRecipes = recipes;
      this.setState({
        recipes: updatedRecipes,
        addName: "",
        addIngredients: "",
        addRecipeModalState: !this.state.addRecipeModalState 
      });
    })
  
  }

  handleEditSubmit(e){
    e.preventDefault()
    //if this.state.name is false, use the orignal recope
    //replace old recipe with new one;
    const recipes = [ ...this.state.recipes];
    let ingredients = this.state.addIngredients;
    ingredients = ingredients.split(",");
    const name = this.state.addName;

    let editedRecipes = recipes.filter(elem=>{
      if(Number(elem.id) === Number(this.state.currentRecipe)){
        if(this.state.addName){
          elem.name = name
        }
        if(this.state.addIngredients){
          elem.ingredients =ingredients
        } 
        return elem;
      } else {
        return elem;
      }
    });



    this.setState({
      recipes: editedRecipes,
      editRecipeModalState: !this.state.editRecipeModalState,
      addName: "",
      addIngredients: "",
    });
    
   localStorage.setItem('recipes', JSON.stringify(editedRecipes));
  }
  
  render() {
    const getRecipes = recipes => {
      return recipes.map((elem, i) => {
        return (
          <Recipe
            key={i}
            element={elem}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            toggleEditModal={this.toggleEditModal}
            toggleRecipeView={this.toggleRecipeView}
            recipeViewState={elem.view}
            editRecipeModalState={this.state.editRecipeModalState}
            handleRecipeName ={this.handleRecipeName}
            handleIngredients ={this.handleIngredients}
            name={this.state.AddName}
            addIngredients={this.state.addIngredients}
            handleEditSubmit={this.handleEditSubmit}
          />
        );
      });
    };

    return (
      <div className = "container">
        <RecipeList className ="recipes-container" recipeList ={getRecipes(this.state.recipes)} />
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

export default MainContainer;