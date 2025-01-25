import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Import the CSS for ReactCrop
import "../styles/ProfilePicture.css";

const ProfilePictureUpload = ({ onSave }) => {
  const [src, setSrc] = useState(null); // Source image for cropping
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Square crop by default
  const [croppedImage, setCroppedImage] = useState(null); // Final cropped image

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result); // Set the image source for cropping
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const handleCropComplete = (crop) => {
    if (src && crop.width && crop.height) {
      const croppedImageUrl = getCroppedImg(src, crop);
      setCroppedImage(croppedImageUrl); // Set the cropped image URL
    }
  };

  // Get the cropped image as a URL
  const getCroppedImg = (imageSrc, crop) => {
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL("image/jpeg"); // Return the cropped image as a data URL
  };

  // Handle saving the cropped image
  const handleSave = () => {
    if (croppedImage) {
      onSave(croppedImage); // Pass the cropped image to the parent component
      setSrc(null); // Reset the cropping state
    }
  };

  return (
    <div className="profile-picture-container">
      {src ? (
        <div>
          {/* ReactCrop component for cropping */}
          <ReactCrop
            src={src}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={handleCropComplete}
          />
          {/* Save button */}
          <button onClick={handleSave} className="btn-primary">
            Save Cropped Image
          </button>
        </div>
      ) : (
        <>
          {/* Display the profile picture or the uploaded image */}
          <img
            src={croppedImage || "https://via.placeholder.com/150"} // Placeholder or uploaded image
            alt="Profile"
            className="profile-picture"
          />
          {/* File input and upload button */}
          <label htmlFor="profile-picture-input" className="profile-picture-upload">
            <i className="fas fa-camera"></i> {/* Camera icon */}
          </label>
          <input
            type="file"
            id="profile-picture-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePictureUpload;