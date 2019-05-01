const express = require("express");
const router = express.Router();

const Hostels = require("../controllers/hostels");

router.post('/hostel',Hostels.create);

router.get('/hostels',Hostels.getAll);

router.get('/hostel/:hostel_id',Hostels.get);

module.exports = router;