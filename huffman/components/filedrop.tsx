'use client'
import React from "react";
import { useRecoilState } from "recoil";
import { filesState } from "@/atoms/files";

export default function FileDrop() {
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = useRecoilState(filesState)
  const dropper = React.useRef(null);

  const dragenter = (e: Event) => {
    e.stopPropagation();
    setDragActive(true)
  }
  const dragleave = (e: Event) => {
    e.stopPropagation();
    setDragActive(false)
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e)
    setFiles(e.dataTransfer.files[0])
    setTimeout(() => {
      console.log(files)
    }, 10000)
  };


  function handleChange(e: Event) {
    console.log(e)
    setFiles((e.target as HTMLInputElement).files[0])
  }
  React.useEffect(() => {
    dropper.current.addEventListener('dragover', handleDragOver);
    dropper.current.addEventListener('drop', handleDrop);

    return () => {
      dropper.current.removeEventListener('dragover', handleDragOver);
      dropper.current.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <div ref={dropper} onDragEnter={dragenter} onDragLeave={dragleave} >
      <form method="post" style={{ display: "inline-block" }} >
        <label htmlFor="images" className={`drop-container ${dragActive ? "drag-active" : ""}`} id="dropcontainer" >
          < span className="drop-title" > Drop files here</span >
          or
          < input type="file" id="images" required onChange={handleChange} />
        </label >
      </form>
    </div>
  )
}
