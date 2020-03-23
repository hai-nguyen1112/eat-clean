import React, {useCallback} from 'react'
import Dropzone from 'react-dropzone'
import axios from '../utils/axiosInstance'

const CLOUDINARY_API_KEY = "836792446588726"
const CLOUDINARY_UPLOAD_PRESET = "fgyxrtxo"
const CLOUDINARY_UPLOAD_URL ="https://api.cloudinary.com/v1_1/dq4spjv1t/image/upload"

const ImageUploadInput = ({updatePreviewImage}) => {
    const handleDrop = useCallback(files => {

        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        formData.append("api_key", CLOUDINARY_API_KEY)
        formData.append("timestamp", (Date.now() / 1000) | 0)

        axios.post(CLOUDINARY_UPLOAD_URL, formData, {
            headers: {"X-Requested-With": "XMLHttpRequest"}
        }).then(response => {
            const data = response.data
            const fileURL = data.secure_url
            updatePreviewImage(fileURL)
        }).catch(error => console.log(error))
    }, [updatePreviewImage])

    return (
        <Dropzone
            multiple={false}
            accept="image/jpg,image/png,image/gif"
            onDrop={handleDrop}
        >
            {({getRootProps, getInputProps}) => {
                return (
                    <div
                        {...getRootProps()}
                    >
                        <input {...getInputProps()}/>
                        <p>Drop an image or click to select a file to upload.</p>
                    </div>
                )
            }}
        </Dropzone>
    )
}

export default ImageUploadInput