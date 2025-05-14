

const Border = require('../models/Border');

// Save or update borders
exports.saveBorders = async (req, res) => {
  try {
    const { imageUrl, borders, originalSize } = req.body;

    const existing = await Border.findOne({ imageUrl });
    let borderDoc;

    if (existing) {
      // Update existing
      borderDoc = await Border.findByIdAndUpdate(
        existing._id,
        { borders, originalSize, updatedAt: Date.now() },
        { new: true }
      );
    } else {
      // Create new
      borderDoc = await Border.create({
        imageUrl,
        borders,
        originalSize
      });
    }

    res.status(200).json({
      success: true,
      data: borderDoc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving borders: ' + error.message
    });
  }
};

// Get borders by image URL
exports.getBorders = async (req, res) => {
  try {
    const borderDoc = await Border.findOne({ 
      imageUrl: req.params.imageUrl 
    });

    if (!borderDoc) {
      return res.status(404).json({
        success: false,
        message: 'No borders found for this image'
      });
    }

    res.status(200).json({
      success: true,
      data: borderDoc
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching borders: ' + error.message
    });
  }
};

// Delete borders
exports.deleteBorders = async (req, res) => {
  try {
    await Border.deleteOne({ imageUrl: req.params.imageUrl });
    res.status(200).json({
      success: true,
      message: 'Borders deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting borders: ' + error.message
    });
  }
};