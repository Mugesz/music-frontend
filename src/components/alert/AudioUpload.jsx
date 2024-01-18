import React, { useRef } from "react";
import ImageUploader from "./ImageUploader";
import ImageLoader from "./ImageLoader";
import { MdDelete } from "react-icons/md";

const AudioUpload = ({
  audioImageCover,
  setAudioImageCover,
  audioUploadProgress,
  setAudioUploadProgress,
  isAudioLoading,
  setIsAudioLoadng,
  deleteImageObject,
}) => {
  const audioRef = useRef();
  return (
    <div className="bg-card  backdrop-blur-md w-full lg:w-300 h-300 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
      {isAudioLoading && <ImageLoader progress={audioUploadProgress} />}
      {!isAudioLoading && (
        <>
          {!audioImageCover ? (
            <ImageUploader
              updatedState={setAudioImageCover}
              setProgress={setAudioUploadProgress}
              isLoading={setIsAudioLoadng}
              isImage={false}
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-md">
              <audio ref={audioRef} src={audioImageCover} controls />

              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                onClick={() => {
                  deleteImageObject(audioImageCover, "audio");
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

export default AudioUpload;
