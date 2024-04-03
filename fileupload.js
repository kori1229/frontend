import React, { useState } from 'react';
import axios from 'axios';
import './fileupload.css';

function FileUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleResumeChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescriptionFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (resumeFile && jobDescriptionFile) {
      setUploadSuccess(false);
      setUploadFailed(false);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('resume', resumeFile);
     // formData.append('jobDescription', jobDescriptionFile);

      try {
        const response = await axios.post('YOUR_API_ENDPOINT_HERE', formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        });

        setUploadSuccess(true);
        setFileDetails(response.data);
      } catch (error) {
        console.error('Error uploading files:', error);
        setUploadFailed(true);
      }
    } else {
      setUploadFailed(true);
      setUploadSuccess(false);
      setFileDetails(null);
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
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <button type="submit">Upload</button>
      </form>

      {/* Upload progress and status messages */}
    </div>
  );
}

export default FileUpload;
