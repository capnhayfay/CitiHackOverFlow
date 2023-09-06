import React, {useEffect, useState} from 'react';

export const FileUpload=()=> {

	const [selectedFile, setSelectedFile] = useState();
    const[isSelected, setIsSelected]= useState(false)
	// const [isFilePicked, setIsFilePicked] = useState(false);

	const handleChange = (event) => {
		setSelectedFile(event.target.files[0])
		setIsSelected(true)  

	};

	const handleSubmit = () => {
     if(isSelected=== true){
        // fetch('http://localhost:4000/api/users/register', {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        //     })
        //     .then((response) => response.json())
        //     .then((result) => {
        //     console.log(result)
        //     })
        console.log(selectedFile)
        alert("File uploded")

     } else{
        alert("upload a file")
     }
	};            


	return(
        
   <form style={{display: 'flex', alignItems:'center'}}>
    {/* <h2>Upload a file</h2> */}
    <label for="inputTag" >
        <img alt='upload' className='uploadIcon' style={{cursor: 'pointer'}}></img>
        <input id="inputTag"type="file" name="file" accept="application/pdf" onChange={handleChange} style={{display: 'none'}}/>
    </label>
        <div style={{marginLeft:5}}>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </form>
	)
}