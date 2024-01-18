import React from "react";
import ImageLoader from "./ImageLoader";
import ImageUploader from "./ImageUploader";
import { MdDelete } from "react-icons/md";

const ArtistUpload = ({
  artistImageCover,
  setArtistImageCover,
  artistUploadingProgress,
  setArtistUploadingProgress,
  isArtistUploading,
  setIsArtistUploading,
  deleteImageObject,
 }) => {
  return (
    <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
      {isArtistUploading && <ImageLoader progress={artistUploadingProgress} />}
      {!isArtistUploading && (
        <>
          {!artistImageCover ? (
            <ImageUploader
              updatedState={setArtistImageCover}
              setProgress={setArtistUploadingProgress}
              isLoading={setIsArtistUploading}
              isImage={true}
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
              <img
                src={artistImageCover}
                alt="uploaded image"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                onClick={() => {
                  deleteImageObject(artistImageCover, "audio");
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

export default ArtistUpload;
