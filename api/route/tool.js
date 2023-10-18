const express = require('express');
const router = express.Router();
const toolApi = require('../controller/toolApi');

router.post('/regTool', toolApi.regTool);
router.get('/getTool/id/:_id', toolApi.getToolId);
router.get('/getTool/all', toolApi.getToolAll);
router.delete('/delTool/:_id', toolApi.delTool);
router.post('/markToolDeleted/:_id', toolApi.markToolDeleted);
router.post('/rentTool/:_id/:renterEmail', toolApi.rentTool);
router.post('/editTool/:_id', toolApi.editTool);
router.get('/getTool/search/:search', toolApi.getToolSearch);
router.get('/getTool/available', toolApi.getToolAvailable);
router.get('/getTool/filter/:attr/:mode', toolApi.getToolFiltered);
router.get('/getTool/filter/:attr/:mode/:value1', toolApi.getToolFiltered);
router.get('/getTool/filter/:attr/:mode/:value1/:value2', toolApi.getToolFiltered);
router.post('/stopRental/:_id', toolApi.stopRental);
module.exports = router;