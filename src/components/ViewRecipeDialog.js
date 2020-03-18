import React, {useCallback, useState} from 'react'
import Button from "@material-ui/core/Button"
import ViewRecipe from "./ViewRecipe"

const ViewRecipeDialog = ({recipe}) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = useCallback(() => {
        setOpen(true)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <>
            <Button color="primary" onClick={handleClickOpen}>View</Button>
            <ViewRecipe
                recipe={recipe}
                open={open}
                handleClose={handleClose}
            />
        </>
    )
}

export default ViewRecipeDialog