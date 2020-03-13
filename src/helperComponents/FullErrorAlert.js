import React, {useCallback} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {connect} from 'react-redux'
import {FETCH_RECIPES_FAIL} from "../redux/actions/recipesActionTypes"
import {clearFetchRecipesError} from "../redux/actions/recipesActions"

const FullErrorAlert = ({
    isThereError,
    errorType,
    clearFetchRecipesError
}) => {
    const handleClose = useCallback(() => {
        switch (errorType) {
            case FETCH_RECIPES_FAIL:
                clearFetchRecipesError()
                break
            default:
                break
        }
    }, [clearFetchRecipesError, errorType])

    return (
        <Dialog
            open={isThereError}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Error Alert"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Something went wrong. Please try again later. Sorry for any inconvenience caused.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        clearFetchRecipesError: () => dispatch(clearFetchRecipesError())
    }
}

export default connect(null, mapDispatchToProps)(FullErrorAlert)