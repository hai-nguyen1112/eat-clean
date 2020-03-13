import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'

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
    }
}))

const RecipeCard = ({recipe}) => {
    const classes = useStyles()

    return (
        <Grid className={classes.gridItem} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {recipe.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {recipe.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <EditIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default RecipeCard