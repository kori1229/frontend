import React, { useState } from 'react';
import axios from 'axios';
import './fileupload.css';

function FileUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [jdUploaded, setJDUploaded] = useState(false);
  const [uploadSuccessJD, setUploadSuccessJD] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleResumeChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescriptionFile(event.target.files[0]);
    setJDUploaded(true);
  };
  
  const handleRemoveResume = () => {
    setResumeFile(null);
  };

  const handleRemoveJobDescription = () => {
    setJobDescriptionFile(null);
    setJDUploaded(false); // Reset to false when the job description file is removed
  };

    const handleSubmit = async (event) => {
  
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
    event.preventDefault();

    try {
    if (resumeFile) {
      setUploadFailed(false);
      const responseCV = await axios.post('http://localhost:8000/uploadcv/', { file: resumeFile }, config);
      setFileDetails({
        resumeName: responseCV.data.name,
      })
      {resumeFile && (
        <button class="removeButton" type="button" onClick={handleRemoveResume}>
          Remove Resume
        </button>
      )}
    }    
    if(jobDescriptionFile){
        const responseJD = await axios.post('http://localhost:8000/uploadjd/', { file: jobDescriptionFile }, config);
        setUploadFailed(false);
        setJDUploaded(true);
        setButtonDisabled(false);
        setFileDetails({
          jobDescriptionName: responseJD.data.name,
        })
    }
      } catch (error) {
        console.error('Error uploading files:', error);
        setUploadFailed(true);
        setUploadSuccessJD(false);
        setFileDetails(null);
      }
    // } else {
    //   setUploadFailed(true);
    //   setUploadSuccessJD(false);
    //   setFileDetails(null);
    // }
};

  const handleGetResults = async () => {
    try {
      const response = await axios.get('http://localhost:8000/startProcess');
      console.log(response.data.message);
      // Handle the response as needed
    } catch (error) {
      console.error('Error getting results:', error);
    }
  };

  return (
    <div className="container">
      <h2>Upload Resume and Job Description</h2>
      <div className="upload-box">
        <div className="upload-item">
          <h3>Upload Resume</h3>
          <input type="file" onChange={handleResumeChange} />
        </div>
        <div className="upload-item">
          <h3>Upload Job Description</h3>
          <input type="file" onChange={handleJobDescriptionChange} />
          {jdUploaded && <p>Job Description uploaded</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <button type="submit" className="uploadbButton">Upload</button>
      </form>
      <button type="button" className="getResultsButton" disabled ={buttonDisabled} onClick={handleGetResults}>
          Get Results
        </button>
      {/* {uploadSuccessJD && (
        <button type="button" className="active" onClick={handleGetResults}>
          Get Results
        </button>
      )} */}

      {/* Upload progress and status messages */}
    </div>
  );
}

export default FileUpload;