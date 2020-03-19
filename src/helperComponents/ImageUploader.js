import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import DropzoneComponent from 'react-dropzone-component'
import 'dropzone/dist/min/dropzone.min'
import './ImageUploader.css'

var ReactDOMServer = require('react-dom/server')

const djsConfig = {
    acceptedFiles: "image/jpeg,image/png,image/gif",
    autoProcessQueue: false,
    uploadMultiple: false,
    addRemoveLinks: true,
    previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview dz-image-preview dz-processing dz-complete">
            <div className="dz-image">
                <img data-dz-thumbnail="true" alt="thumbnail" />
            </div>
            {/*<div className="dz-details">*/}
            <div className="dz-filename">
                <span data-dz-name="true"></span>
            </div>
            <div className="dz-size">
                <span data-dz-size="true"></span>
            </div>
            {/*</div>*/}
            <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
            <div className="dz-success-mark"><span>✔</span></div>
            <div className="dz-error-mark"><span>✘</span></div>
            <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
        </div>
    )
}

const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    maxFiles: 1,
    postUrl: 'no-url'
}

export default class ImageUploader extends PureComponent {
    showPreview = image => {
        if (image == null) return

        let mockFile = {
            name: image.name,
            size: image.byte_size,
            dataURL: image.url,
        }

        this.myDropzone.files.push(mockFile)
        this.myDropzone.emit("addedfile", mockFile)
        this.myDropzone.createThumbnailFromUrl(
            mockFile,
            this.myDropzone.options.thumbnailWidth,
            this.myDropzone.options.thumbnailHeight,
            this.myDropzone.options.thumbnailMethod,
            true,
            thumbnail => {
                this.myDropzone.emit('thumbnail', mockFile, thumbnail)
                this.myDropzone.emit("complete", mockFile)
            }
        )
    }

    removePrevAndAddNew = image => {
        if (this.myDropzone.files.length > 1) {
            let prevImage = this.myDropzone.files[0]
            this.myDropzone.emit('removedfile', prevImage)
        }

        this.props.selectImage(image)
    }

    render() {
        const {image} = this.props

        const eventHandlers = {
            init: dropzone => {
                this.myDropzone = dropzone
                this.showPreview(image)
            },
            addedfile: image => this.removePrevAndAddNew(image),
            removedfile: () => this.props.unselectImage()
        }

        return (
            <DropzoneComponent
                config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
            />
        )
    }
}

ImageUploader.propTypes = {
    image: PropTypes.shape({
        name: PropTypes.string,
        byte_size: PropTypes.number,
        url: PropTypes.string
    }),
    selectImage: PropTypes.func.isRequired,
    unselectImage: PropTypes.func.isRequired
}