import React, { useState } from 'react';
import axios from 'axios';
import './fileupload.css';

// function FileUpload() {
const FileUpload = () => {

    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
    const [jdUploaded, setJDUploaded] = useState(false);

    // const [uploadFailed, setUploadFailed] = useState(false);
    // const [uploadSuccessJD, setUploadSuccessJD] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    //   const [fileDetails, setFileDetails] = useState({ resumeName: '', jobDescriptionName: '' });
    //const [uploadProgress, setUploadProgress] = useState(0);

    const handleResumeChange = (event) => {
        setResumeFile(event.target.files[0]);
        // setResumeFile(event.target.files);
        // console.log(event.target.files)
        // setFileDetails(prevDetails => ({ ...prevDetails, resumeName: event.target.files[0].name }));
    };

    const handleJobDescriptionChange = (event) => {
        setJobDescriptionFile(event.target.files[0]);
        setJDUploaded(true);
        //setButtonDisabled(false)
        // setFileDetails(prevDetails => ({ ...prevDetails, jobDescriptionName: event.target.files[0].name }));
    };

    const handleRemoveResume = (e) => {
        setResumeFile(null);
        document.getElementById("resumeForm").reset()
        // setFileDetails({ resumeName: '', jobDescriptionName: '' });
    };

    const handleRemoveJobDescription = () => {
        setJobDescriptionFile(null);
        setJDUploaded(false);

        document.getElementById("descForm").reset()
        // setFileDetails(null);
    };

    // console.log("main jinda hu")
    const handleSubmit = async (event) => {
        // event.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        // setUploadFailed(false);
        //setUploadProgress(0);
        try {
            if (resumeFile) {
                // setUploadFailed(false);
                const responseCV = await axios.post('http://localhost:8000/uploadcv/', { file: resumeFile }, config);
                // setFileDetails({
                //     resumeName: responseCV.data.name,
                // })
                {
                    resumeFile && (
                        <button type="button" onClick={handleRemoveResume}>
                            Remove Resume
                        </button>
                    )
                }
            }

            if (jobDescriptionFile) {
                const responseJD = await axios.post('http://localhost:8000/uploadjd/', { file: jobDescriptionFile }, config).then(setButtonDisabled(false))
                //setUploadFailed(false);
                setJDUploaded(true);
                setButtonDisabled(false);
                // setFileDetails({
                //     jobDescriptionName: responseJD.data.name,
                // })
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert(error)
            console.log(error)
            // setUploadFailed(true);
            //setUploadSuccessJD(false);
            // setFileDetails(null);
        }
    }

    const handleGetResults = async () => {
        try {
            const response = await axios.get('http://localhost:8000/startProcess');
            console.log("working")
            console.log(response.data.message);
            // Handle the response as needed
        } catch (error) {
            console.error('Error getting results:', error);
        }
    };
    return (
        <div className="container flex flex-col justify-end">
            <h2 className="font-sans text-3xl font-semibold text-[#00338D] tracking-tighter">Upload Resume and Job Description</h2>
            <div className="flex flex-row justify-center items-center space-x-4">
            <div className="upload-box box-border h-[30vh] w-[70vh] border-4 border-[#00338D] flex flex-row justify-around items-center my-2">
                {/* <div className="flex"> */}
                <form id="resumeForm" className="w-[35vw]">
            <div className='flex justify-center items-center w-full'>
                <h3 className="font-sans text-2xl font-semibold text-[#00338D] tracking-tighter mb-2">Add Resume</h3>
            </div>
            <div className="flex">
                <input className="mr-4 w-full text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-[#F9FAFB] file:rounded-xl file:border-0 file:text-sm file:font-semibold file:text-center file:bg-[#374151] file:text-white file:mr-4 file:py-2.5 file:px-8" type="file" onChange={handleResumeChange} />
                {resumeFile && (
                    <button className="w-[8rem] active text-[#00338D] bg-white border-2 border-[#00338D] font-medium rounded-lg text-sm" type="button" onClick={handleRemoveResume}>
                        Remove
                    </button>
                )}
            </div>
            <h3 className="text-neutral-500 text-sm">Upload Resume to Database</h3>
        </form>
</div>
                <div className="upload-box box-border h-[30vh] w-[70vh] border-4 border-[#00338D] flex flex-row justify-around items-center my-2">

                {/* </div> */}
        {/* Form for uploading job description */}
        <form id='descForm' className="w-[35vw]">
            <div className='flex flex-row justify-center items-center w-full'>
                <h3 className="font-sans text-2xl font-semibold text-[#00338D] tracking-tighter mb-2">Add Job Description</h3>
            </div>
            <div className="flex">
                <input className="mr-4 w-full text-sm text-gray-900 border border-gray-300 rounded-xl cursor-pointer bg-[#F9FAFB] file:rounded-xl file:border-0 file:text-sm file:font-semibold file:text-center file:bg-[#374151] file:text-white file:mr-4 file:py-2.5 file:px-8" type="file" onChange={handleJobDescriptionChange} />
                {jobDescriptionFile && (
                    <button className="w-[8rem] active text-[#00338D] bg-white border-2 border-[#00338D] font-medium rounded-lg text-sm" onClick={handleRemoveJobDescription}>
                        Remove
                    </button>
                )}
            </div>
            <h3 className="text-neutral-500 text-sm">Upload Job Description to Start Process</h3>
        </form>
            </div>
            </div>
            <div className='flex justify-evenly	'>
                {/* <form onSubmit={handleSubmit}> */}
                <button className={`active text-white bg-[#005EB8] hover:bg-[#00338D] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-[8rem] `} onClick={handleSubmit} type="submit">Upload</button>
                {/* </form> */}
                <button type="button" className={`w-[8rem] active text-white bg-[#00338D] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ${buttonDisabled ? "opacity-60" : "opacity-100"}`} disabled={buttonDisabled} onClick={handleGetResults}>
                    Get Results
                </button>

                {/* Additional buttons and messages */}
            
        </div>
        </div>
    );
}

export default FileUpload;

