const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const{User,Course}=require("../db/index");
const { JWT_Secret } = require("../Key");
const jwt = require("jsonwebtoken");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username:username,
        password:password
    })
    res.json({
        message:"User account created successfully"
    })
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({
          username,
          password
    })
    if(user){
          const token = jwt.sign(username,JWT_Secret);
          res.json({
            token: token
          })
    }
    else{
        res.json({
            message: "Try again the password or username is incorrect"
        })
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await User.find({});
    res.json({
        content: courses
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    const username = req.username;
    const courseId = req.params.courseId;
     User.updateOne({
        username:username
     },{
        "$push":{
            purchasedCourses:courseId
        }
     })
     res.json({
        message:"Purchase done"
     })
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router