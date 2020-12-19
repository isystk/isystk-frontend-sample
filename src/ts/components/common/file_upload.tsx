import React from 'react'
import axios from "axios";
import * as _ from "lodash";
import TextField from "material-ui/TextField";

interface IProps {
  imageList;
  fields;
  label;
  type;
  meta;
  setImageList;
}

interface IState {
  files: any[];
}

class FileUpload extends React.Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onChange(e) {
    this.fileUpload(e.target.files).then((response)=>{
      this.props.setImageList(response.data.data);
    })
  }
  fileUpload(files){
    const url = 'https://localhost/api/v1/fileupload/image';
    const formData = new FormData();
    for(let file of files) {
      formData.append('imageFile', file);
    };
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post(url, formData,config);
  }

  render() {

    const {
      fields,
      label,
      type,
      meta: { touched, error },
    } = this.props;

    const renderImageList = _.map(this.props.imageList, (image, index) => (
      <div key={`image${index}`}>
        <img src={image.imageUrl} width="100px" />
        <input type={type} name={`${fields.name}[${index}].imageId`} defaultValue={image.imageId}  />
      </div>
    ));

    const style = {
      textAlign: 'left' as const,
      margin: 10
    };

    return (
      <React.Fragment>
        <p style={style}>{label}</p>
        <input type="file"
              multiple
              onChange={this.onChange} />
        {renderImageList}
      </React.Fragment>
   )
  }
}



export default FileUpload
