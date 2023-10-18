const express = require('express');
const router = express.Router();
const userAPI = require('../controller/userApi');


router.post('/signUp', userAPI.signUp);
router.post('/signIn', userAPI.signIn);
router.get('/getUser/:_id', userAPI.fetchUser);
router.get('/getUser/email/:email', userAPI.fetchUserEmail);



module.exports = router;