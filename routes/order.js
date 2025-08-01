const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { service_id, link, quantity } = req.body;
  const auth = req.headers.authorization;

  const isAdmin = auth === process.env.ADMIN_TOKEN;
  const API_TOKEN = process.env.UZBEK_SEEN_API;

  if (!isAdmin) {
    return res.status(401).json({ success: false, message: 'Ruxsat yo‘q. Admin token noto‘g‘ri.' });
  }

  try {
    const response = await axios.post('https://uzbek-seen.uz/api/v2', {
      key: API_TOKEN,
      action: 'add',
      service: service_id,
      link: link,
      quantity: quantity
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('Buyurtma xatosi:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Xizmatni yuborib bo‘lmadi', error: error.response?.data });
  }
});

module.exports = router;
