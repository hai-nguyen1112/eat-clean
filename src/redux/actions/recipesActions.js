import {
    FETCH_RECIPES_START,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAIL,
    CLEAR_FETCH_RECIPES_ERROR
} from "./recipesActionTypes"
import axios from '../../utils/axiosInstance'

export const fetchRecipes = () => {
    return dispatch => {
        dispatch(fetchRecipesStart())
        axios({
            url: '/recipes',
            method: 'GET'
        })
            .then(response => dispatch(fetchRecipesSuccess(response.data)))
            .catch(error => dispatch(fetchRecipesFail(error)))
    }
}

const fetchRecipesStart = () => {
    return {
        type: FETCH_RECIPES_START,
        isLoadingRecipes: true,
        loadRecipesError: null
    }
}

const fetchRecipesSuccess = recipes => {
    return {
        type: FETCH_RECIPES_SUCCESS,
        recipes: recipes,
        isLoadingRecipes: false,
        loadRecipesError: null
    }
}

const fetchRecipesFail = error => {
    return {
        type: FETCH_RECIPES_FAIL,
        isLoadingRecipes: false,
        loadRecipesError: error
    }
}

export const clearFetchRecipesError = () => {
    return {
        type: CLEAR_FETCH_RECIPES_ERROR,
        loadRecipesError: null
    }
}
