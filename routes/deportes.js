const { Router } = require("express");
const { findAllCC, insertCC, updateCC, preInsertCC, preUpdateCC, findByIdCC, deleteByIdCC } = require("../controller/deportesCC");

const router = Router()

router.get('/', findAllCC)

router.get('/findById', findByIdCC)

router.get('/insert', preInsertCC)
router.post('/insert', insertCC)

router.get('/update', preUpdateCC)
router.post('/update', updateCC)

router.get('/deleteById', deleteByIdCC)

module.exports = router