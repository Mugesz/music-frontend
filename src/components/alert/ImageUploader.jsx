import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { BiCloudUpload } from "react-icons/bi";
import { storage } from "../../config/firebase.config";
import { useStateValue } from "../../Context/StateProvider";
import { actionType } from "../../Context/reducer";

const ImageUploader = ({ updatedState, setProgress, isLoading, isImage }) => {
  const [{}, dispatch] = useStateValue();
  const uploadImage = async (e) => {
    isLoading(true);
    const uploadedFile = e.target.files[0];
    const fileType = uploadedFile.type.startsWith("image/")
      ? "images"
      : "audio";
    const storagePath = `${fileType}/${Date.now()}-${uploadedFile.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

    try {
      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      });
      await uploadTask;

      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      updatedState(downloadUrl);
      setProgress(0);
      isLoading(false);
      
    } catch (error) {
      console.error("Error uploading file:", error);
      isLoading(false);
    }

    dispatch({
      type: actionType.SET_ALERT_TYPE,
      alertType: "success",
    });

    setTimeout(() => {
      dispatch({
        type: actionType.SET_ALERT_TYPE,
        alertType: null,
      });
    }, 5000);
  };

  return (
    <label>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <p className="font-bold text-2xl">
            <BiCloudUpload />
          </p>
          <p className="text-lg">
            Click to Upload{isImage ? " an image" : " an audio"}
          </p>
        </div>
      </div>
      <input
        type="file"
        name="upload-image"
        accept={`${isImage ? "image/*" : "audio/*"}`}
        onChange={uploadImage}
        className="w-0 h-0"
      />
    </label>
  );
};

export default ImageUploader;
