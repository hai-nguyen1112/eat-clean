import {
    FETCH_RECIPES_START,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAIL,
    CLEAR_FETCH_RECIPES_ERROR
} from "../actions/recipesActionTypes"
import updateObject from "../../helperFunctions/updateObject"

const initialState = {
    recipes: [],
    isLoadingRecipes: false,
    loadRecipesError: null
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

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPES_START: return fetchRecipesStart(state, action)
        case FETCH_RECIPES_SUCCESS: return fetchRecipesSuccess(state, action)
        case FETCH_RECIPES_FAIL: return fetchRecipesFail(state, action)
        case CLEAR_FETCH_RECIPES_ERROR: return clearFetchRecipesError(state, action)
        default: return state
    }
}

export default recipesReducer
