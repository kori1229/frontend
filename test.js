import React, { useState } from 'react';
import './App.css';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null);

  const onDropResume = (acceptedFiles) => {
    setResumeFile(acceptedFiles[0]);
  };

  const onDropJobDescription = (acceptedFiles) => {
    setJobDescriptionFile(acceptedFiles[0]);
  };

  const { getRootProps: getRootPropsResume, getInputProps: getInputPropsResume } = useDropzone({
    onDrop: onDropResume
  });

  const { getRootProps: getRootPropsJobDescription, getInputProps: getInputPropsJobDescription } = useDropzone({
    onDrop: onDropJobDescription
  });

  const handleUpload = () => {
    if (resumeFile && jobDescriptionFile) {
      // Here you can implement the logic to upload the files
      console.log('Uploading resume:', resumeFile);
      console.log('Uploading job description:', jobDescriptionFile);
    } else {
      alert('Please select both a resume file and a job description file.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload Resume and Job Description</h1>
        <div>
          <label>Upload Resume:</label>
          <div {...getRootPropsResume()} className="dropzone">
            <input {...getInputPropsResume()} />
            <p>Drag 'n' drop a resume file here, or click to select a file</p>
          </div>
        </div>
        <div>
          <label>Upload Job Description:</label>
          <div {...getRootPropsJobDescription()} className="dropzone">
            <input {...getInputPropsJobDescription()} />
            <p>Drag 'n' drop a job description file here, or click to select a file</p>
          </div>
        </div>
        <button onClick={handleUpload}>Upload</button>
      </header>
    </div>
  );
}

