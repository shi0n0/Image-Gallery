import React, { useState } from "react"; 
import { FileUploader } from "react-drag-drop-files"; 
import Image from "next/image";

const fileTypes = ["JPG", "PNG", "GIF"]; 

function DragDrop() { 
const [file, setFile] = useState(null); 
const handleChange = (file: React.SetStateAction<null>) => { 
	setFile(file); 
}; 

return ( 
	<div className=" relative w-full h-60">
    <Image
    src="/ImageGallery.png"
    alt="デフォルトヘッダー"
    objectFit="cover"
    className="opacity-30"
    fill
    ></Image>
      <FileUploader 
        handleChange={handleChange} 
        name="file"
        types={fileTypes} 
	/> 
	</div> 
	
); 
} 

export default DragDrop;
