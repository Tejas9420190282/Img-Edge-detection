
// ImgUploader.jsx (React)

// ImgUploader.jsx (React)

import axios from "axios";
import React, { useState } from "react";

function ImgUploader() {
    const [img, setImg] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const [processedImage, setProcessedImage] = useState(null); // New state for processed image

    const handleImageChange = (e) => {
        const selectedImg = e.target.files[0];
        setImg(selectedImg);
        setUploadStatus("");
        setProcessedImage(null); // Reset processed image when new file is selected

        console.log("Selected image:", {
            name: selectedImg.name,
            type: selectedImg.type,
            size: `${(selectedImg.size / 1024).toFixed(2)} KB`,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!img) {
            setUploadStatus("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", img);

        try {
            setUploadStatus("Processing image...");

            const response = await axios.post(
                "http://localhost:1212/handle-img",
                formData
            );

            console.log("Processing successful:", response.data);
            setUploadStatus("Edge detection complete!");
            setProcessedImage(response.data.imageUrl); // Store the processed image URL

            // Saving borders after editing
            const saveBorders = async () => {
                try {
                    const response = await axios.post("/api/borders", {
                        imageUrl: processedImageUrl,
                        borders: editedBorders,
                        originalSize: { width, height },
                    });
                    console.log("Borders saved:", response.data);
                } catch (error) {
                    console.error("Error saving borders:", error);
                }
            };

            // Loading borders
            const loadBorders = async (imageUrl) => {
                try {
                    const response = await axios.get(
                        `/api/borders/${imageUrl}`
                    );
                    setBorders(response.data.borders);
                } catch (error) {
                    console.log("No saved borders found");
                }
            };
        } catch (error) {
            console.error("Processing failed:", error);
            setUploadStatus(
                `Error: ${error.response?.data?.message || error.message}`
            );
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Edge Detection Processor
            </h2>

            {/* Upload Form */}
            <form
                onSubmit={handleSubmit}
                style={{
                    marginBottom: "30px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                }}
            >
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{
                        margin: "10px 0",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "100%",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        background: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                        width: "100%",
                    }}
                    disabled={!img}
                >
                    Process Image
                </button>

                {uploadStatus && (
                    <p
                        style={{
                            marginTop: "15px",
                            color: uploadStatus.includes("Error")
                                ? "red"
                                : "#4CAF50",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        {uploadStatus}
                    </p>
                )}
            </form>

            {/* Results Section */}
            {processedImage && (
                <div
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "20px",
                        marginTop: "20px",
                    }}
                >
                    <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
                        Edge Detection Result
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "15px",
                        }}
                    >
                        <img
                            src={processedImage}
                            alt="Edge detection result"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "500px",
                                border: "1px solid #eee",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <a
                            href={processedImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: "#2196F3",
                                textDecoration: "none",
                            }}
                        >
                            Open Full Image
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImgUploader;

