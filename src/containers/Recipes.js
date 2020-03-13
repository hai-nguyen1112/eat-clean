import React, {useEffect} from 'react'
import MainAppBar from "../helperComponents/MainAppBar"
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux'
import {fetchRecipes} from "../redux/actions/recipesActions"
import FullLoading from "../helperComponents/FullLoading"
import FullErrorAlert from "../helperComponents/FullErrorAlert"
import {isEmpty} from 'lodash'
import {FETCH_RECIPES_FAIL} from "../redux/actions/recipesActionTypes"
import RecipeCard from "../components/RecipeCard"
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    cardsContainer: {
        padding: "10px",
        flex: "1 1 0"
    }
}))

const Recipes = ({
     recipes,
     getRecipes,
     isLoadingRecipes,
     loadRecipesError
}) => {
    const classes = useStyles()

    useEffect(() => {
        getRecipes()
    }, [getRecipes])

    let recipeCards
    if (!isEmpty(recipes)) {
        recipeCards = recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe}/>)
    }

    return (
        <>
            <MainAppBar/>
            <Container className={classes.cardsContainer}>
                <Grid container spacing={3}>
                    {recipeCards}
                </Grid>
            </Container>
            <FullLoading
                isLoading={isLoadingRecipes}
            />
            <FullErrorAlert
                isThereError={isEmpty(loadRecipesError) ? false : true}
                errorType={FETCH_RECIPES_FAIL}
            />
        </>
    )
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes.recipes,
        isLoadingRecipes: state.recipes.isLoadingRecipes,
        loadRecipesError: state.recipes.loadRecipesError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: () => dispatch(fetchRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)