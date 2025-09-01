import {Address} from '../models/addressSchema.js'

export const addAddress = async (req, res) => {
  try {
    const { userId, address } = req.body;
    if (!userId || !address) {
      return res.status(400).json({
        success: false,
        message: "User ID and address are required"
      });
    }
    const newAddress = await Address.create({
      ...address,
      userId,
    });
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding address",
      error: error.message,
    });
  }
};


export const getAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.status(200).json({
      success: true,
      addresses});
    } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error: error.message });
    }
}

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    res.json({ success: true, message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
