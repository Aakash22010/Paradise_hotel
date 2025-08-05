const CategoryData = require('../models/CategoryData');

// Get all data or by category
const getCategoryData = async (req, res) => {
  try {
    const { category } = req.query;

    const query = category ? { category } : {};
    const data = await CategoryData.find(query);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  getCategoryData
};
