'use client'

import { filesState } from "@/atoms/files";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";

export default function Decode() {

  //on clicking decode button this function triggers
  const files = useRecoilValue(filesState)
  function downloadFile(fileName: string, data: string | number | boolean) {
    //file name ->firstletter+_encoded.txt    //data is encoded text recieved from encode function
    let a = document.createElement("a");
    a.href = "data:application/octet-stream," + encodeURIComponent(data);
    a.download = fileName;
    a.click();
  }

  const decodeFun = () => {
    const uploadedFile = files; //because we are uploading 1 file we need that first file uploaded by upload.files function
    if (uploadedFile === undefined) {
      //if nothing is there in uploadedFile ->result = undefined
      alert("No file uploaded !");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
      //will see text file now
      const text = fileLoadedEvent.target.result; //will get all the written text in file
      if (text.length === 0) {
        //file is blank
        alert("Text can not be empty ! Upload another file !");
        return;
      }
      const newProduct = { text: text };
      fetch("http://localhost:5000/api/v1/yoli", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          let { decoded, tree_structure, info } = data;
          console.log(data);
          console.log(decoded);
          downloadFile(
            uploadedFile.name.split(".")[0] + "_decoded.txt",
            decoded,
          ); //triggers function downloadFile
        });
      // let [decoded, tree_structure, info] = coder.decode(text); //trigger decode function in huffman.js and will recieve the returned values from function(decoded text,tree structure,compression ratio)
    };
    fileReader.readAsText(uploadedFile, "UTF-8");
  };
  return (
    <motion.div
      whileHover={{ scale: [null, 1.5, 1.4] }}
      transition={{ duration: 0.3 }}
    >
      <Button
        className={buttonStyles({ color: "danger", radius: "full", variant: "shadow" })}
        onClick={decodeFun}
      >Decode</Button>
    </motion.div>
  )
}
