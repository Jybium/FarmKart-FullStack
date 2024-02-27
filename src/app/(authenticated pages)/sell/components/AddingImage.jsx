"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

const AddingImage = () => {

  const [images, setImages] = useState([]);

  const data = (preview) => {
    const image = URL.createObjectURL(preview);

    return image;
  };

  // const PackFiles = (event) => {
  //   // console.log(event);
  //   const selectedFiles = [];
  //   const targetFiles = event.target.files;
  //   // console.log(targetFiles);

  //   const targetFilesObject = [...targetFiles];
  //   // console.log(targetFilesObject);
  //   targetFilesObject.map((file) => {
  //     selectedFiles.push(URL.createObjectURL(file));
  //     console.log(file)
  //     localStorage.setItem(`image_${file.name}`, JSON.stringify(file));
  //   });
  //   setImages(selectedFiles);
  //   console.log(images)
  //   localStorage.setItem(`image`, JSON.stringify(selectedFiles));
  // };

  // const PackFiles = (event) => {
  //   const selectedFiles = [];
  //   const targetFiles = event.target.files;

  //   const targetFilesObject = [...targetFiles];
  //   targetFilesObject.map((file) => {
  //     const fileUrl = URL.createObjectURL(file);
  //     selectedFiles.push(fileUrl);
  //     // Store the file URL in localStorage
  //     localStorage.setItem(`image_${file.name}`, fileUrl);
  //   });

  //   // Store the array of file URLs in localStorage
  //   localStorage.setItem(`images`, JSON.stringify(targetFiles));
  // };



// const PackFiles = (event) => {
//   const selectedFiles = [];
//   const imageFiles = [];
//   const targetFiles = Array.from(event.target.files);

//   targetFiles.forEach((file) => {
//     imageFiles.push(URL.createObjectURL(file));
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const dataURL = e.target.result;
//       selectedFiles.push(dataURL);
//     };
//     reader.readAsDataURL(file);
//   });

//   // Log the selectedFiles array to check its content
//   console.log("Selected Files:", selectedFiles);

//   // Convert selectedFiles array to JSON string before storing in localStorage
//   localStorage.setItem("images", JSON.stringify(selectedFiles));

//   setImages(imageFiles);
// };



const PackFiles = async (event) => {
  const selectedFiles = [];
    const imageFiles = [];

  const targetFiles = event.target.files;

  const targetFilesArray = Array.from(targetFiles);
  for (const file of targetFilesArray) {
    const base64String = await fileToBase64(file);
    selectedFiles.push(base64String);
    imageFiles.push(URL.createObjectURL(file));
    // Store the Base64-encoded file data in localStorage
    // localStorage.setItem(`image_${file.name}`, base64String);
  }

  // Store the array of Base64-encoded file data in localStorage
  localStorage.setItem("images", JSON.stringify(selectedFiles));
  setImages(imageFiles)
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};



  return (
    <section className="my-8">
      <div className="grid gap-1">
        <h1 className="font-black text-md">Add Photo</h1>
        <p>Add at least 1 picture for this section</p>
        <p>
          The last picture is the title picture. You can add more pictures for
          better description.
        </p>
      </div>
      <div className="flex flex-wrap my-5 gap-5">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={PackFiles}
          className="w-44 h-44 rounded bg-sell-page relative z-10 opacity-0"
        />
        <div
          className="bg-sell-page bg-black bg-center absolute w-44 h-44"
          style={{ backgroundSize: "60%", backgroundRepeat: "no-repeat" }}
        ></div>
        {images.map((image) => (
          <div className={`w-44 h-44 rounded`}>
            {/* <Image
              src={image}
               
               
              width="100"
              className="w-full block max-h-full"
            /> */}
            <img
              src={image}
              alt="selected image"
              className="block w-full max-h-full  h-44 text-center object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="text-sm grid gap-1">
        <p>Each Picture must not exceed 5MB</p>
        <p>Supported image formata are JPG and PNG*</p>
      </div>
    </section>
  );
};

export default AddingImage;

