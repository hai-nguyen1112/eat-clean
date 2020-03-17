import React, {useState, useCallback} from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import EditRecipeForm from "./EditRecipeForm"

const EditRecipeDialog = ({recipe}) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = useCallback(() => {
        setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <EditRecipeForm
                recipe={recipe}
                open={open}
                handleClose={handleClose}
            />
        </div>
    )
}

export default EditRecipeDialog