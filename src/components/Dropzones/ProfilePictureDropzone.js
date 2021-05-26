import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "reactstrap";
import { profilePic } from "../../network/ApiAxios";

export default function ProfilePictureDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    const response = profilePic(acceptedFiles[0]);
    console.log(response);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        className="mr-4"
        color="info"
        // href="#pablo"
        onClick={(e) => e.preventDefault()}
        size="sm"
      >
        Connect
      </Button>
    </div>
  );
}
