const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User,Course } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_Secret} = require("../Key");

const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

     Admin.create({
        username:username,
        password:password
    }).then(function(){
        res.json({
            msg:"Account created successfully"
        })
    })
    .catch(function(){
        res.json({
            msg:"Account not created successfully, there is an error thingy"
        }) 
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({
        username:username,
        password:password
    })
    if(user){
        const token = jwt.sign({
            username
        },JWT_Secret)
        res.json({
            message:token
        })
    }
    else{
        res.status(411).json({
            message:"User does no exist, check username or password"
        })
    }
    


});

router.post('/courses', adminMiddleware, async(req, res) => {
    const title = req.body.title;
    const description = req.body.title;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const newCourse = await Course.create({
      title: title,
      description:description,
      price:price,
      imageLink:imageLink
    })
    res.json({
        message:"Course created successfully", courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
   const courses = await Course.find({})
   res.json({
       message:courses
   })
});
module.exports = router;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbmNoaXRAZ21haWwuY29tIiwiaWF0IjoxNzA0NDU5MDQ3fQ.6q4FkH7OWyAvCseU8DibC1hoHpDu3-OYmd8LnV6P610