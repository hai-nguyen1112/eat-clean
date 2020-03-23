import {
    EDIT_RECIPE_START,
    EDIT_RECIPE_SUCCESS,
    EDIT_RECIPE_FAIL
} from "./editRecipeActionTypes"
import axios from '../../utils/axiosInstance'

export const editRecipe = (id, dataToEdit) => {
    return dispatch => {
        dispatch(editRecipeStart())
        axios({
            url: `/recipes/${id}`,
            method: "PATCH",
            headers: {
                "Accept": "applicaiton/json",
                "Content-Type": "application/json"
            },
            data: {...dataToEdit}
        })
            .then(response => dispatch(editRecipeSuccess(response.data)))
            .catch(error => dispatch(editRecipeFail(error)))
    }
}

const editRecipeStart = () => {
    return {
        type: EDIT_RECIPE_START,
        isEditingRecipe: true,
        editRecipeError: null
    }
}

const editRecipeSuccess = editedRecipe => {
    return {
        type: EDIT_RECIPE_SUCCESS,
        isEditingRecipe: false,
        editRecipeError: null,
        editedRecipe: editedRecipe
    }
}

const editRecipeFail = error => {
    return {
        type: EDIT_RECIPE_FAIL,
        isEditingRecipe: false,
        editRecipeError: error
    }
}