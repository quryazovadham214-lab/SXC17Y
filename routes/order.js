const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// ADMIN TOKEN (faqat siz uchun)
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// UzbekSeen API
const UZBEKSEEN_API = 'https://uzbek-seen.uz/api/v2';
const API_KEY = process.env.UZBEKSEEN_API_KEY;

// Buyurtma berish route
router.post('/order', async (req, res) => {
  const { service, link, quantity, token } = req.body;

  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ success: false, message: 'Ruxsatsiz!' });
  }

  try {
    const response = await axios.post(`${UZBEKSEEN_API}`, {
      key: API_KEY,
      action: 'add',
      service: service,
      link: link,
      quantity: quantity,
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Xatolik', error: error.message });
  }
});

module.exports = router;
