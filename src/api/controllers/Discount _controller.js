import Discount from '../models/discount_model';
import mongoose from 'mongoose';

const createDiscount = async (req, res) => {
  const {
    productId,
    productName,
    productDiscount,
    productDescription,
    productExpireDate,
    createdAt
  } = req.body;

  try {
    const discount = await Discount.create({
      productId,
      productName,
      productDiscount,
      productDescription,
      productExpireDate,
      createdAt
    });
    res.status(201).json(discount); // 201 for resource created successfully
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find({});
    res.status(200).json(discounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const getDiscountById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID Format' });
  }

  try {
    const discount = await Discount.findById(id);

    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    res.status(200).json(discount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const updateDiscount = async (req, res) => {
  const { id } = req.params;
  const {
    productId,
    productName,
    productDiscount,
    productDescription,
    productExpireDate,
    createdAt
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID Format' });
  }

  try {
    const discount = await Discount.findOneAndUpdate(
      { _id: id },
      {
        productId,
        productName,
        productDiscount,
        productDescription,
        productExpireDate,
        createdAt
      },
      { new: true }
    );

    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    res.status(200).json(discount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

const deleteDiscount = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const deletedDiscount = await Discount.findOneAndDelete({ _id: id });

    if (!deletedDiscount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    res.status(200).json(deletedDiscount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export { createDiscount, deleteDiscount, updateDiscount, getAllDiscounts, getDiscountById };
