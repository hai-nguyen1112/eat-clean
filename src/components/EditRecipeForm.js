import React, {useCallback, useState} from 'react'
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"

const EditRecipeForm = ({recipe, open, handleClose}) => {
    const [title, setTitle] = useState(recipe.title)
    const [description, setDescription] = useState(recipe.description)
    const [instruction, setInstruction] = useState(recipe.instruction)

    const resetForm = useCallback(() => {
        setTitle(recipe.title)
        setDescription(recipe.description)
        setInstruction(recipe.instruction)
    }, [recipe.title, recipe.description, recipe.instruction])

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        console.log("I am here")
    }, [])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            fullWidth={true}
            scroll="paper"
        >
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogContent dividers={true}>
                <TextField
                    autoComplete="off"
                    name="title"
                    required
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={useCallback(e => setTitle(e.target.value),[])}
                    style={{marginBottom: "15px"}}
                />
                <TextField
                    autoComplete="off"
                    name="description"
                    required
                    fullWidth={true}
                    label="Description"
                    multiline
                    rows="4"
                    variant="outlined"
                    value={description}
                    onChange={useCallback(e => setDescription(e.target.value), [])}
                    style={{marginBottom: "15px"}}
                />
                <TextField
                    autoComplete="off"
                    name="instruction"
                    required
                    fullWidth={true}
                    label="Instruction"
                    multiline
                    rows="4"
                    variant="outlined"
                    value={instruction}
                    onChange={useCallback(e => setInstruction(e.target.value), [])}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleClose()
                        setTimeout(resetForm, 1000)
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditRecipeForm