const { Router } = require('express');
const router = Router();


const routeCountry = require('./ruteCountry');
const routeActivity = require('./ruteActivity');


router.use('/countries', routeCountry)

router.use('/activity', routeActivity)



module.exports = router;
