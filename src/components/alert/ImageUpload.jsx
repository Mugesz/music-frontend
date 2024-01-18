import React, { useState } from "react";
import ImageLoader from "./ImageLoader";
import ImageUploader from "./ImageUploader";
import { MdDelete } from "react-icons/md";

const ImageUpload = ({
  deleteImageObject,
  setImageUploadProgress,
  imageUploadProgress,
  setSongImageCover,
  songImageCover,
  setIsImageLoading,
  isImageLoading,
}) => {
  return (
    <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
      {isImageLoading && (
        <ImageLoader progress={imageUploadProgress} isImage={true} />
      )}
      {!isImageLoading && (
        <>
          {!songImageCover ? (
            <ImageUploader
              updatedState={setSongImageCover}
              setProgress={setImageUploadProgress}
              isLoading={setIsImageLoading}
              isImage={true}
            />
          ) : (
            <div className="relative w-full h-full overflow-hidden rounded-md">
              <img
                src={songImageCover}
                alt="uploaded image"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                onClick={() => {
                  deleteImageObject(songImageCover, "image");
                }}
              >
                <MdDelete className="text-white" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageUpload;
