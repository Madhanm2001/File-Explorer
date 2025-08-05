// import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import '../App.css'

const File = ({folder,updateFunction}:any) => {



  return (
    <div style={{marginLeft:folder.fileId?'0px':'22px'}}>
     {folder.files.map((data:any,id:any)=>{
      return(<div key={id} style={{display:'flex',gap:'10px',marginTop:'10px'}} id='file'><h1 style={{fontSize:'14px',color:'#828282',fontWeight:'500'}} key={id}>{data.name}</h1><div style={{height:'30px',width:'70px',marginTop:'10px'}} ><MdDeleteOutline style={{color:'red',cursor:'pointer'}} onClick={()=>updateFunction('deleteFile',folder.folderId,'',data.id,'','')} size={18}/></div></div>)
     })}
    </div>

  )
}

export default File
