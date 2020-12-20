import React from 'react'
import axios from "axios";
import * as _ from "lodash";
import TextField from "material-ui/TextField";
import { API_ENDPOINT } from "../../common/constants/api";
import { API } from "../../utilities";

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
  async fileUpload(files){
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    let response = null;
    for(let file of files) {
      response = await API.post(API_ENDPOINT.FILE_UPLOAD, {
        'imageFile': file
      }, config);
    };
    return response;
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
