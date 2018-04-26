import React from "react";
import Recipe from "./Recipe";
import AddRecipeModal from "./AddRecipeModal";
import RecipeList from './RecipeList';

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      addIngredients: "",
      addName: "",
      addRecipeModalState: false,
      editRecipeModalState: false,
      currentRecipe: 0,
      nameModified: false,
      ingredientsModified: false
    };

    this.handleRecipeName = this.handleRecipeName.bind(this);
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this);
    this.createNewRecipe = this.createNewRecipe.bind(this);
    this.handleIngredients = this.handleIngredients.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.toggleAddRecipeModal = this.toggleAddRecipeModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.toggleRecipeView = this.toggleRecipeView.bind(this);
    this.changeRecipeView = this.changeRecipeView.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }

  //check local storage - end if empty, store example recipes
componentDidMount(){
  const checkLocal = JSON.parse(localStorage.getItem("recipes"))
  if(checkLocal){
    this.setState({
      recipes: checkLocal
    })
  } else {
    this.setState({recipes:[
      {
        id: "recipe1",
        name: "Cherry Pie",
        ingredients: ["pastry", "cherries", "sugar"],
        view: false
      },
      {
        id: "recipe2",
        name: "Roast Dinner",
        ingredients: ["potatoes", "peas", "kale", "carrots", "nuts", "herbs"],
        view: false
      },
      {
        id: "recipe3",
        name: "Dhal",
        ingredients: ["lentils", "spices", "tomato paste"],
        view: false
      }
    
    ]})
  }
 }

 //toggle recipe view
 
  changeRecipeView(e, cb) {
    let id = e.target.value;
    let recipes = [...this.state.recipes];
    let newArr = recipes.map(recipe => {
      if (recipe.id === id) {
        recipe.view = !recipe.view;
        return recipe;
      } else {
        recipe.view = false;
        return recipe;
      }
    });
    cb(newArr);
  }

  toggleRecipeView(e) { 
    e.preventDefault();
    this.changeRecipeView(e, res => {
      this.setState({
        recipes: res,
        currentRecipe: e.target.value
      });
    });
  }


  //Toggle add recipe modal

  toggleAddRecipeModal(e) {
    e.preventDefault();
    this.setState({
      addRecipeModalState: !this.state.addRecipeModalState
    });
  }

  //Toggle Edit recipe modal

  toggleEditModal(e) {
    e.preventDefault();
    this.setState({
      editRecipeModalState: !this.state.editRecipeModalState,
    })
  }


  //update state with inputs in recipe name and ingredients fields on forms 



  handleRecipeName(e) {
    const value = e.target.value;
    this.setState({
      addName: value,
      nameModified: true
    });
  }

  handleIngredients(e) {
    const value = e.target.value;
    this.setState({
      addIngredients: value,
      ingredientsModified: true
    });

  }

  //Delete Recipe 

  deleteRecipe(id, recipes, cb) {
    let filteredRecipes = recipes;
    filteredRecipes = filteredRecipes.filter(recipe => {
      return !(recipe.id === id);
    });
    cb(filteredRecipes);
  }

  handleDelete(e) {
    e.preventDefault();
    const id = e.target.value;
    let recipes = [...this.state.recipes];
    let newRecipes;
    this.deleteRecipe(id, recipes, function(res) {
      newRecipes = res;
    });
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    this.setState({
      recipes: JSON.parse(localStorage.getItem("recipes"))
    });
  }

 

//Create new recipe 

 validateNewRecipe(name, ingredients){
  return{
    name: name.length === 0,
    ingredients: ingredients.length === 0
  }
 }
  createNewRecipe(cb) {
    let ingredients = this.state.addIngredients;
    ingredients= ingredients.replace(/(^,)|(,$)/g, "").split(",");
    console.log('the ingredients ', ingredients)
    const name = this.state.addName; 
    //generate unique id
    const recipes = [...this.state.recipes];
    const theId = `recipe${Date.now()}`
   
    const newRecipe = {
      id: theId,
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
        addRecipeModalState: !this.state.addRecipeModalState,
        nameModified:false,
        ingredientsModified:false
      });
    })
  
  }

  //Edit Recipe

  validateRecipeEdit(name, ingredients){
    return{
      name: name.length === 0,
      ingredients: ingredients.length === 0
    }
   }

 
  handleEditSubmit(e){
    e.preventDefault()
    //if this.state.addName , use the orignal recipe
    //replace old recipe with new one;
    const recipes = [ ...this.state.recipes];
    let ingredients = this.state.addIngredients;
    ingredients = ingredients.split(",");
    const name = this.state.addName;

    let editedRecipes = recipes.filter(recipe=>{
      //if the current recipe being edited has the same id as the recipe in state
      if(recipe.id === this.state.currentRecipe){
        //if new data has been added in the name field, replace the old name
        if(this.state.addName){
          recipe.name = name
        }
        //if new data has been added in the ingredients field, replace the old ingredients
        if(this.state.addIngredients){
          recipe.ingredients = ingredients
        } 
        return recipe;
      } else {
        return recipe;
      }
    });

    this.setState({
      recipes: editedRecipes,
      editRecipeModalState: !this.state.editRecipeModalState,
      addName: "",
      addIngredients: "",
      nameModified: false,
      ingredientsModified:false
    });
  
   localStorage.setItem('recipes', JSON.stringify(editedRecipes));
  }
  
  getRecipes(recipes){
    const nameModified = this.state.nameModified;
    const ingredientsModified = this.state.ingredientsModified;
    const {addName, addIngredients} = this.state
    const errors = this.validateRecipeEdit(addName, addIngredients)
    const editIsEnabled = !Object.keys(errors).some(x => errors[x]);

    return recipes.map((recipe, i) => {
      return (
        <Recipe
          key={i}
          element={recipe}
          handleDelete={this.handleDelete}
          toggleEditModal={this.toggleEditModal}
          toggleRecipeView={this.toggleRecipeView}
          recipeViewState={recipe.view}
          editRecipeModalState={this.state.editRecipeModalState}
          handleRecipeName ={this.handleRecipeName}
          handleIngredients ={this.handleIngredients}
          name={this.state.addName}
          ingredients={this.state.addIngredients}
          handleEditSubmit={this.handleEditSubmit}
          nameModified={nameModified}
          ingredientsModified={ingredientsModified}
          editIsEnabled = {editIsEnabled}
          errors={errors}
        />
      );
    });
  }

  render() {
    const {addName, addIngredients} = this.state
    const errors = this.validateNewRecipe(addName, addIngredients)
    const addIsEnabled = !Object.keys(errors).some(x => errors[x]);
    return (
      <div className = "container">
        <RecipeList className ="recipes-container" recipeList ={this.getRecipes(this.state.recipes)} />
        <AddRecipeModal
          addIsEnabled = {addIsEnabled}
          errors={errors}
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