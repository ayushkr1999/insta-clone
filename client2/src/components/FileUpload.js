import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Header from './Header/Header';
import Footer from './Header/Footer';
import Moment from 'react-moment'



const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    
  };
  const onChange2 = e => {
    // setFile(e.target.files[0]);
    // setFilename(e.target.files[0].name);
      setMessage(e.target.value)
  };

  // const value= 'cation is herer'
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    
    // formData.append( 
    //   "myFile", 
    //   file, 
       
    // );
    formData.append('cap',message) 
  //   for (var key of formData.keys()) {
  //     console.log(key); 
  //  }

    try {
       const res = await axios.post('/api/posts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
        ,
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  console.log(message)
  return (
    <Fragment>
      {/* <Header /> */}
      
      {/* {message ? <Message msg={message} /> : null} */}
      <div className='container'>
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
           
          />
          <br></br>
          <br></br>
          {/* <br></br> */}
          <textarea
            type='text'
            className=''
            id='customFile'
            onChange={onChange2}
            style={{width:'100%'}}
          />
          <br></br>
          <br></br>
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      </div>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
      <Footer />
    </Fragment>
  );
};

export default FileUpload;
