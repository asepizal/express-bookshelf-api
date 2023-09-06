const express = require('express')
const { addBookHandler } = require('./handler')
const router = express.Router()

router.post('/',addBookHandler)
router.get('/',()=>{
  console.log('get all')
})
router.get('/:bookId',()=>{
  console.log('get by id')
})
router.put('/:bookId',()=>{
  console.log('update')
})
router.delete('/:bookId',()=>{
  console.log('delete')
})

module.exports = router