import { useEffect, useState } from 'react';
import './App.css';
import Folder from './component/folder';
import { v4 as uuidv4 } from 'uuid';

function App() {
  let objectList: any = {
    public: {
      files: [{ name: 'index.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }],
      folderId: uuidv4(),
      isToggle: false,
      isclose: false,
      first: {
        files: [{ name: 'first.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }],
        folderId: uuidv4(),
        five: {
          files: [{ name: 'first.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }],
          folderId: uuidv4(),
          isToggle: false,
          isclose: true,
        },
        isToggle: false,
        isclose: true,
      }
    },
    rrr: {
      files: [{ name: 'index.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }],
      folderId: uuidv4(),
      isToggle: false,
      isclose: false,
      first: {
        files: [{ name: 'first.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }],
        folderId: uuidv4(),
        five: {
          files: [{ name: 'first.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }, { name: 'index.html', id: uuidv4() }],
          folderId: uuidv4(),
          isToggle: false,
          isclose: true,
        },
        isToggle: false,
        isclose: true,
      }
    },
    src: {
      files: [{ name: 'index.js', id: uuidv4() }, { name: 'index.js', id: uuidv4() }],
      folderId: uuidv4(),
      inner: {
        files: [{ name: 'index.css', id: uuidv4() }, { name: 'erer.css', id: uuidv4() }, { name: 'sas.css', id: uuidv4() }],
        folderId: uuidv4(),
        isToggle: false,
        isclose: true,
        hhhhfhgf: {
          files: [{ name: 'index.css', id: uuidv4() }, { name: 'erer.css', id: uuidv4() }, { name: 'sas.css', id: uuidv4() }],
          folderId: uuidv4(),
          isToggle: false,
          isclose: true,
        }
      },
      isToggle: false,
      isclose: false,
    },
    source: {
      files: [{ name: 'index.js', id: uuidv4() }, { name: 'index.js', id: uuidv4() }],
      folderId: uuidv4(),
      outer: {
        files: [{ name: 'index.css', id: uuidv4() }, { name: '77777.css', id: uuidv4() }, { name: 'sas.css', id: uuidv4() }],
        folderId: uuidv4(),
        isToggle: false,
        isclose: true,
        hhhh: {
          files: [{ name: 'index.css', id: uuidv4() }, { name: 'erer.css', id: uuidv4() }, { name: 'sas.css', id: uuidv4() }],
          folderId: uuidv4(),
          isToggle: false,
          isclose: true,
        }
      },
      isToggle: false,
      isclose: false,
    },
    file: { fileId: uuidv4(), files: [{ name: 'package.json', id: uuidv4() }] },
  }
  const [objList, setObjList]: any = useState(objectList)

  const [arrayObj, setArrayObj] = useState<any[]>([])


  useEffect(() => {
 console.log("updated");
 
    onArrayObj()

  }, [objList])

  const onArrayObj = () => {
    console.log("trigger",objList);
    
    //  setArrayObj([])
    const temp: any = [];
    for (let key in objList) {
      temp.push({ folderName: key, folder: objList[key] })
    }
    setArrayObj(temp)
    console.log("checking", arrayObj)
  }

  const updateFunction = (method: any, folderId?: any, isToggle?: any, fileId?: any, folderName?: any, fileName?: any) => {

    let updated: any
    if (method === 'toggleFolder') {
      updated = flattenToogleFolder(objList, folderId, isToggle);

    }
    else if (method === 'addFolder') {
      updated = flattenAddFolder(objList, folderId, folderName);

    }
    else if (method === 'deleteFolder') {
      updated = flattenDeleteFolder(objList, folderId);

    }
    else if (method === 'addFile') {
      updated = flattenAddFile(objList, folderId, fileName);

    }
    else if (method === 'deleteFile') {
      updated = flattenDeleteFile(objList, folderId, fileId);

    }

    setObjList(updated);
    console.log(objList, "✅ updated objectList");

  }



  const flattenToogleFolder = (objectList: any, id: any, isToggle: any) => {
    const copy = Array.isArray(objectList) ? [...objectList] : { ...objectList };

    for (let key in copy) {

      if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key])) {

        if (copy[key].folderId == id) {

          let status = isToggle
          const onToggleFolder = (copy: any) => {
            for (let key in copy) {
              if (typeof (copy[key]) == 'object') {
                console.log("key", key, copy.folderId != id)
                if (copy.folderId != id) {
                  console.log("yes Id")
                  copy.isclose = status
                  copy.isToggle = !status
                }
                else {
                  copy.isToggle = !status
                }
                onToggleFolder(copy[key])
              }
            }
          }

          onToggleFolder(copy[key])



        }

        if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key]))
          flattenToogleFolder(copy[key], id, isToggle)

      }

    }
    return copy
  }

  const flattenAddFolder = (objectList: any, id: any, name: string) => {
    
    const copy = Array.isArray(objectList) ? [...objectList] : { ...objectList };

    for (let key in copy) {

      if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key])) {

        if (copy[key].folderId == id) {

          copy[key][name]={folderId:uuidv4(),files: [],isToggle:false,isclose:!copy[key].isToggle}
          break;



        }

        if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key]))
          flattenAddFolder(copy[key], id,name)

      }

    }
    return copy

  }
  const flattenDeleteFolder = (objectList: any, id: any) => {

    const copy = Array.isArray(objectList) ? [...objectList] : { ...objectList };

    for (let key in copy) {

      if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key])) {

        if (copy[key].folderId == id) {

          const onToggleFolder = (copy: any) => {
            for (let key in copy) {
              if (typeof (copy[key]) == 'object') {
                console.log("key", key, copy.folderId != id)
                if (copy.folderId == id) {
                   
                   delete copy[key]
                  
                }

                onToggleFolder(copy[key])
              }
            }
          }

          onToggleFolder(copy[key])



        }

        if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key]))
          flattenDeleteFolder(copy[key], id)

      }

    }
    return copy

  }

  const flattenAddFile = (objectList: any, id: any, fileName: any) => {

    const copy = Array.isArray(objectList) ? [...objectList] : { ...objectList };

    for (let key in copy) {

      if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key])) {

        if (copy[key].folderId == id) {

          copy[key].files.push({ name: fileName, id: uuidv4() })

        }

        if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key]))
          flattenAddFile(copy[key], id, fileName)
      }

    }

    return copy

  }

  const flattenDeleteFile = (objectList: any, id: any,fileId:any) => {

    const copy = Array.isArray(objectList) ? [...objectList] : { ...objectList };

    for (let key in copy) {

      if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key])) {

        if (copy[key].folderId == id) {

          const temp= copy[key].files.filter((data:any)=>{
                     return(data.id!=fileId)
             })

            copy[key].files=temp

        }

        if (typeof (copy[key]) == 'object' && !Array.isArray(copy[key]))
          flattenDeleteFile(copy[key], id,fileId)
      }

    }

    return copy

  }

  console.log(arrayObj, 'arrayObj');

  return (
    <div style={{ padding: '0 10px' }}>
      <h2 style={{ textAlign: 'center', color: 'white', fontFamily:'cursive' }}>File Explorer</h2>
      {arrayObj && arrayObj.map((data, id) => {
        console.log("count", id, arrayObj.length)
        const currObj = { [data.folderName]: data.folder }
        console.log("currrret", currObj);

        return (
          <>
            <Folder key={id} folderObj={currObj} updateFunction={updateFunction} />
          </>
        )

      })}

    </div>
  );
}

export default App;
