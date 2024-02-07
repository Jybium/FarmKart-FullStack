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

  const PackFiles = (event) => {
    // console.log(event);
    const selectedFiles = [];
    const targetFiles = event.target.files;
    // console.log(targetFiles);

    const targetFilesObject = [...targetFiles];
    // console.log(targetFilesObject);
    targetFilesObject.map((file) => {
      selectedFiles.push(URL.createObjectURL(file));
    });
    setImages(selectedFiles);
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
              objectFit="cover"
              objectPosition="center"
              width="100"
              className="w-full block max-h-full"
            /> */}
            <img
              src={image}
              alt="selected image"
              className="block w-full max-h-full  h-44 text-center"
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
