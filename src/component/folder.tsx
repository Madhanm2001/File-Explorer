import { useEffect, useState } from 'react'
import File from './file'
import '../App.css'
// Folder collapsed icon
import { MdExpandMore } from "react-icons/md";

// Folder expanded icon
import { MdExpandLess } from "react-icons/md";

// Delete file/folder icon
import { MdDeleteOutline } from "react-icons/md";

// Add new folder icon
import { FiFolderPlus } from "react-icons/fi";

// Add new file icon
import { AiOutlineFileAdd } from "react-icons/ai";


const Folder = ({ folderObj ,updateFunction}: any) => {
    console.log(folderObj,"kkkkkkkkkkkkk")
    // const [files, setFiles] = useState<any[]>([])
    const [folderArray, setFolderArray] = useState<any[]>([])
    // const[folderObject,setFolderObj]=useState(folderObj)
    console.log(folderObj,"folderObject");
    

useEffect(()=>{
console.log(folderArray,"currenrObj");
    flatten(folderObj)
},[folderObj])
let n=1
const temp: any = []
const  flatten=(folderObj:any)=>{
    let folder:any|undefined
    
    for(let key in folderObj){
        if(typeof(folderObj[key])=='object'){
         if(folderObj[key]){
            if(key === "public") console.log("key mama", folderObj[key].isToggle)
            folder={folder:key,files:folderObj[key].files,folderId:folderObj[key].folderId,isToggle:folderObj[key].isToggle,isclose:folderObj[key].isclose,marginLeft:n,fileId:folderObj[key].fileId}
        }
        if(folder.files!=undefined && (folder.folderId==undefined||folder.fileId==undefined)){
            temp.push(folder)
            n+=25
            flatten(folderObj[key])
        }
    }
    
}
console.log("temp", temp)
setFolderArray(temp)
}

    return (
        <div>
         {folderArray.length > 0 && folderArray.map((folder,id)=>{
            console.log(folder,"folder mama");
            
           return(
           <li key={id} style={{listStyle:'none',marginTop:'10px'}}>
            {!folder.fileId&&(!folder.isclose?<div style={{display:'flex',gap:'10px',marginLeft:`${folder.marginLeft}px`}}>
                <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}} id='folder'>
                    <div onClick={()=>{updateFunction('toggleFolder',folder.folderId,folder.isToggle)}} style={{display:'flex',gap:'5px',cursor:'pointer'}}>
                    <p style={{marginTop:'18px'}}>{folder.isToggle?<MdExpandLess style={{color:'skyblue'}} size={18} />:<MdExpandMore style={{color:'white'}} size={18} />}</p>
                    <h1 style={{color:'#ABABAB',fontSize:'17px',fontFamily:'sans-serif',marginTop:'17px',wordBreak:'break-word'}}>{folder.folder}</h1>
                    </div>
                <div style={{display:'flex',marginTop:'18px',gap:'10px'}}><FiFolderPlus onClick={()=>{updateFunction('addFolder',folder.folderId,"","","mango","")}} style={{color:'yellow',cursor:'pointer'}} size={18}/><AiOutlineFileAdd onClick={()=>updateFunction('addFile',folder.folderId,"","","","Ben 10")} style={{color:'orange',cursor:'pointer'}} size={18}/><MdDeleteOutline onClick={()=>{updateFunction('deleteFolder',folder.folderId)}}  style={{color:'red',cursor:'pointer'}} size={18}/></div></div>
                </div>:'')}
                 {/* {folder.isToggle&&<hr style={{color:'grey',width:'auto'}}/>} */}
            {((folder.isToggle && !folder.isclose) || folder.fileId) &&
            <li style={{marginLeft:`${folder.fileId?10:folder.marginLeft}px`}}>
                <File folder={folder} updateFunction={updateFunction}/>
            </li>}
           </li> 
        )
         })} 
        </div>
    )
}

export default Folder
