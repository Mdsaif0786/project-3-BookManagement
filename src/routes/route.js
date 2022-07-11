const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController  = require("../controllers/reviewController")
const middleware = require("../middleware/auth.js")
const middleware2 = require("../middleware/auth2.js")

//User Apis
router.post("/register",userController.createUser)
router.post("/login",userController.loginUser)

//Books Apis
router.post("/books",middleware.authentication,middleware.authorisation, bookController.createBook)
router.get("/books",middleware.authentication,bookController.getBooks)
router.get("/books/:bookId",middleware.authentication,middleware2.authorisationbyBId,bookController.getBookById)
router.put("/books/:bookId",middleware.authentication,middleware2.authorisationbyBId,bookController.updateBooks)
router.delete("/books/:bookId",middleware.authentication,middleware2.authorisationbyBId,bookController.deleteById)

//Review Apis
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)

module.exports = router



