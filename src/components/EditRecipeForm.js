import React, {useState, useCallback} from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {withFormik} from "formik"
import * as Yup from "yup"
import FormControl from "@material-ui/core/FormControl"
import FormHelperText from "@material-ui/core/FormHelperText"
import {connect} from 'react-redux'
import {editRecipe} from "../redux/actions/editRecipeActions"
import ImageUploadInput from "../helperComponents/ImageUploadInput"
import CardMedia from '@material-ui/core/CardMedia'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}))

const EditRecipeForm = ({recipe, updateRecipe}) => {
    const [previewImage, setPreviewImage] = useState(!recipe.image ? "https://bulma.io/images/placeholders/1280x960.png" : recipe.image)

    const classes = useStyles()

    const InnerForm = props => {
        const {
            values,
            // touched,
            errors,
            dirty,
            isValid,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            // handleReset,
            setFieldValue
        } = props

        // const selectImage = image => setFieldValue('image', image)
        // const unselectImage = () => setFieldValue('selectedImage', null)

        const updatePreviewImage = useCallback(updatedImage => {
            setPreviewImage(updatedImage)
            setFieldValue('image', updatedImage)
        }, [])

        console.log(values.image)
        console.log(dirty)

        return (
            <form onSubmit={handleSubmit}>
                <FormControl
                    fullWidth={true}
                    // error={!errors.selectedImage ? false : true}
                >
                    <CardMedia
                        className={classes.media}
                        image={previewImage}
                        title="dish image"
                    />
                    <ImageUploadInput
                        updatePreviewImage={updatePreviewImage}
                    />
                    {/*{errors.selectedImage ? <FormHelperText>{errors.selectedImage}</FormHelperText> : undefined}*/}
                </FormControl>
                <TextField
                    autoComplete="off"
                    name="title"
                    required
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!errors.title ? false : true}
                    // error={errors.title && touched.title ? true : false}
                    helperText={errors.title ? errors.title : undefined}
                    // helperText={errors.title && touched.title ? errors.title : undefined}
                    style={{margin: "15px 0 15px 0"}}
                />
                <TextField
                    autoComplete="off"
                    name="description"
                    required
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!errors.description ? false : true}
                    helperText={errors.description ? errors.description : undefined}
                    style={{marginBottom: "15px"}}
                    multiline
                    rows="4"
                />
                <TextField
                    autoComplete="off"
                    name="instruction"
                    required
                    fullWidth={true}
                    label="Instruction"
                    variant="outlined"
                    value={values.instruction}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!errors.instruction ? false : true}
                    helperText={errors.instruction ? errors.instruction : undefined}
                    style={{marginBottom: "15px"}}
                    multiline
                    rows="4"
                />
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    onClick={handleReset}*/}
                {/*    disabled={!dirty || isSubmitting}*/}
                {/*>*/}
                {/*    Reset*/}
                {/*</Button>*/}
                &nbsp;&nbsp;
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting || !isValid || !dirty}
                >
                    Submit
                </Button>
            </form>
        )
    }

    const EnhancedForm = withFormik({
        mapPropsToValues: () => ({
            title: recipe.title,
            description: recipe.description,
            instruction: recipe.instruction,
            image: recipe.image
        }),
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required("Title is required!")
                .max(100, "Text is too long!"),
            description: Yup.string()
                .required("Description is required!")
                .max(500, "Text is too long!"),
            instruction: Yup.string()
                .required("Instruction is required!")
                .max(1000, "Text is too long!"),
            image: Yup.string()
                .required("Image is required!"),
            // selectedImage: Yup.mixed()
            //     .required("Image is required!")
            //     .test(
            //         "fileSize",
            //         "Max size is 80KB!",
            //         value => value && value.size <= 81920
            //     )
        }),
        handleSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                setSubmitting(false)
            }, 1000)
        },
        displayName: "BasicForm" // helps with React DevTools
    })(InnerForm)

    return <EnhancedForm/>
}

const mapDispatchToProps = dispatch => {
    return {
        updateRecipe: (id, dataToEdit) => dispatch(editRecipe(id, dataToEdit))
    }
}

export default connect(null, mapDispatchToProps)(EditRecipeForm)