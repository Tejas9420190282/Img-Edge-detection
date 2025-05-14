
// handle_Img_Controller.js (Node)

const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY_ID,
    api_secret: process.env.CLOUDINARY_KEY_SECRET
});

// Configure multer
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    }
});

const handle_Img_Controller = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: "No file uploaded" 
            });
        }

        // Process image with sharp (edge detection)
        const processedBuffer = await sharp(req.file.buffer)
            .greyscale()
            .normalise()
            .convolve({
                width: 3,
                height: 3,
                kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1]
            })
            .toBuffer();

              console.log("✅ Edge detection completed successfully".bg); // New log

        // Upload directly to Cloudinary
        const cloudinaryResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { 
                    folder: 'edge-detected',
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(processedBuffer);
        });

        res.status(200).json({
            success: true,
            message: "Edge detection and upload completed",
            imageUrl: cloudinaryResult.secure_url,
            publicId: cloudinaryResult.public_id
        });

    } catch (error) {
        console.error("Processing error:", error);
        res.status(500).json({
            success: false,
            message: "Error processing image: " + error.message
        });
    }
};

module.exports = {
    upload,
    handle_Img_Controller
};

