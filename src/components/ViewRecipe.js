import React, {useCallback, useState} from "react"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from "@material-ui/core/styles"
import EditRecipeForm from "./EditRecipeForm"

const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    dialogActions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

const ViewRecipe = ({recipe, open, handleClose}) => {
    const classes = useStyles()
    const [toggle, setToggle] = useState('view')

    let imageSrc = !recipe.image ? "https://bulma.io/images/placeholders/1280x960.png" : recipe.image

    const handleToggle = useCallback(newToggle => {
        setToggle(newToggle)
    }, [])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            fullWidth={true}
            scroll="paper"
            transitionDuration={0}
        >
            {
                toggle === 'view'
                ?
                <DialogContent dividers={true}>
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
                            {recipe.description}
                        </Typography>
                        <br/>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {recipe.instruction}
                        </Typography>
                    </CardContent>
                </DialogContent>
                :
                toggle === 'edit'
                ?
                <DialogContent dividers={true}>
                    <EditRecipeForm recipe={recipe}/>
                </DialogContent>
                :
                null
            }
            <DialogActions className={classes.dialogActions}>
                <Button
                    color="primary"
                    onClick={toggle === 'view' ? () => handleToggle('edit') : toggle === 'edit' ? () => handleToggle('view') : () => {}}
                >
                    {toggle === 'view' ? 'Edit' : toggle === 'edit' ? 'View' : null}
                </Button>
                <Button
                    color="primary"
                    onClick={() => {
                        handleClose()
                        handleToggle('view')
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewRecipe