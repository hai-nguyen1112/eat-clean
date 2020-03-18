import React from 'react'
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import {withFormik} from "formik"
import * as Yup from "yup"
import ImageUploader from "../helperComponents/ImageUploader"

const EditRecipeForm = ({recipe}) => {
    const InnerForm = props => {
        const {
            values,
            errors,
            dirty,
            isValid,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
        } = props

        const selectImage = image => values.selectedImage = image

        const unselectImage = () => values.selectedImage = null

        return (
            <form onSubmit={handleSubmit}>
                <ImageUploader
                    image={values.selectedImage}
                    selectImage={selectImage}
                    unselectImage={unselectImage}
                />
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
                    helperText={errors.title ? errors.title : undefined}
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
                <Button
                    variant="contained"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                >
                    Reset
                </Button>
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
            selectedImage: null
        }),
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required("Title is required!")
                .max(100, "Too long!"),
            description: Yup.string()
                .required("Description is required!")
                .max(500, "Too long!"),
            instruction: Yup.string()
                .required("Instruction is required!")
                .max(1000, "Too long!")
        }),
        handleSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 1000);
        },
        displayName: "BasicForm" // helps with React DevTools
    })(InnerForm)

    return <EnhancedForm/>
}

export default EditRecipeForm