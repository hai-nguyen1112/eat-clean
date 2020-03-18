import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ViewRecipeDialog from "./ViewRecipeDialog"

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        height: "100%"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}))

const RecipeCard = ({recipe}) => {
    const classes = useStyles()
    let imageSrc = !recipe.image ? "https://bulma.io/images/placeholders/1280x960.png" : recipe.image

    return (
        <Grid className={classes.gridItem} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={imageSrc}
                    title={recipe.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Created: {recipe.created_at}
                        <br />
                        Last Updated: {recipe.updated_at}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions} disableSpacing>
                    <ViewRecipeDialog recipe={recipe}/>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default RecipeCard