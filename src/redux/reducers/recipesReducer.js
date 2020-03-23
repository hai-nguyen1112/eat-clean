import {
    FETCH_RECIPES_START,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAIL,
    CLEAR_FETCH_RECIPES_ERROR
} from "../actions/recipesActionTypes"
import {
    EDIT_RECIPE_START,
    EDIT_RECIPE_SUCCESS,
    EDIT_RECIPE_FAIL
} from "../actions/editRecipeActionTypes"
import updateObject from "../../helperFunctions/updateObject"

const initialState = {
    recipes: [],
    isLoadingRecipes: false,
    loadRecipesError: null,
    isEditingRecipe: false,
    editRecipeError: null
}

const fetchRecipesStart = (state, action) => {
    return updateObject(state, {
        isLoadingRecipes: action.isLoadingRecipes,
        loadRecipesError: action.loadRecipesError
    })
}

const fetchRecipesSuccess = (state, action) => {
    return updateObject(state, {
        recipes: action.recipes,
        isLoadingRecipes: action.isLoadingRecipes,
        loadRecipesError: action.loadRecipesError
    })
}

const fetchRecipesFail = (state, action) => {
    return updateObject(state, {
        isLoadingRecipes: action.isLoadingRecipes,
        loadRecipesError: action.loadRecipesError
    })
}

const clearFetchRecipesError = (state, action) => {
    return updateObject(state, {
        loadRecipesError: action.loadRecipesError
    })
}

const editRecipeStart = (state, action) => {
    return updateObject(state, {
        isEditingRecipe: action.isEditingRecipe,
        editRecipeError: action.editRecipeError
    })
}

const editRecipeSuccess = (state, action) => {
    let newRecipes = state.recipes.map(recipe => {
        if (recipe.id === action.editedRecipe.id) {
            return action.editedRecipe
        } else {
            return recipe
        }
    })
    return updateObject(state, {
        isEditingRecipe: action.isEditingRecipe,
        editRecipeError: action.editRecipeError,
        recipes: newRecipes
    })
}

const editRecipeFail = (state, action) => {
    return updateObject(state, {
        isEditingRecipe: action.isEditingRecipe,
        editRecipeError: action.editRecipeError
    })
}

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPES_START: return fetchRecipesStart(state, action)
        case FETCH_RECIPES_SUCCESS: return fetchRecipesSuccess(state, action)
        case FETCH_RECIPES_FAIL: return fetchRecipesFail(state, action)
        case CLEAR_FETCH_RECIPES_ERROR: return clearFetchRecipesError(state, action)
        case EDIT_RECIPE_START: return editRecipeStart(state, action)
        case EDIT_RECIPE_SUCCESS: return editRecipeSuccess(state, action)
        case EDIT_RECIPE_FAIL: return editRecipeFail(state, action)
        default: return state
    }
}

export default recipesReducer
