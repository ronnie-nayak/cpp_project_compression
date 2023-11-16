'use client'
import { filesState } from "@/atoms/files";
import { Button } from "@nextui-org/button";
import { button as buttonStyles } from "@nextui-org/theme";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";

export default function Encode() {
  const files = useRecoilValue(filesState)
  function downloadFile(fileName: string, data: string | number | boolean) {
    //file name ->firstletter+_encoded.txt    //data is encoded text recieved from encode function
    let a = document.createElement("a");
    a.href = "data:application/octet-stream," + encodeURIComponent(data);
    a.download = fileName;
    a.click();
  }
  const encodeFun = () => {
    //on clicking encode button this function is triggered

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
      fetch("http://localhost:5000/api/v1/emojis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          let { encoded, tree_structure, info } = data;
          console.log(data);
          console.log(encoded);
          downloadFile(
            uploadedFile.name.split(".")[0] + "_encoded.txt",
            encoded,
          ); //triggers function downloadFile
        });
      // let [encoded, tree_structure, info] = coder.encode(text); //trigger encode function in huffman.js and will recieve the returned values from function(encoded text,tree structure,compression ratio)
      //compression ratio
    };
    fileReader.readAsText(uploadedFile, "UTF-8");
  };
  return (
    <motion.div
      whileHover={{ scale: [null, 1.5, 1.4] }}
      transition={{ duration: 0.3 }}
    >
      <Button
        className={buttonStyles({ color: "success", radius: "full", variant: "shadow" })}
        onClick={encodeFun}
      >Encode</Button>
    </motion.div>
  )
}
