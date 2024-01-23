const express = require("express");
const router = express.Router();
const zod = require("zod");
const bcrypt = require("bcrypt");
const User = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { auth } = require("../middlewares/auth");
const Bank = require("../models/Bank");


const userSchema = zod.object({
  userName: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const loginSchema = zod.object({
  userName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  const body = req.body;
  console.log(body, "body");
  const { success } = userSchema.safeParse(body);
  console.log(success, "succ");
  if (!success) {
    return res.status(404).json({
      message: "Invalid inputs",
    });
  }

  const existingUser = await User.findOne({ userName });
  if (existingUser) {
    return res.status(404).json({
      message: "User already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await User.create({
    userName,
    firstName,
    lastName,
    password: hashedPassword,
    profilePic :  `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    balance :  Math.floor(1 + Math.random() * 10000)
  });

await Bank.create({
    userId : createUser._id,
    balance :  Math.floor(1 + Math.random() * 10000)
  })

//   const createCourse = await Courses.create({
//     name : "Ecommerce",
//     user : createUser._id
//   })

//   const data =await User.findOneAndUpdate({_id : createUser._id} , {$push : {courses : createCourse._id}} , {new : true})
//   console.log(data , "Data");

  createUser.password = undefined;

  return res.status(200).json({
    message: "User created successfully",
    user: createUser,
  });
});

router.post("/signin", async (req, res) => {
  try {
    const body = req.body;
    const { userName, password } = req.body;
    console.log(userName , password , "data");
    const { success } = loginSchema.safeParse(body);
    if (!success) {
     return res.status(400).json({
        message: "Invalid Credential",
      });
    }

    const existUser = await User.findOne({ userName });
    if (!existUser) {
    return  res.status(400).json({
        message: "User does not exist",
      });
    }

    const validPassword = await bcrypt.compare(password, existUser.password);
    if (!validPassword) {
     return res.status(400).json({
        message: "Invalid Password",
      });
    }

    existUser.password = undefined;
    const payload = {
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      userName: existUser.userName,
      id : existUser._id
    };

    const token = await jwt.sign(payload, JWT_SECRET);
    existUser.token = token;
    return res.status(200).json({
      success: true,
      message: "User Logged In successfully",
      user: existUser,
      token,
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/users", auth, async (req, res) => {
  //   {userName : {$ne : req.userName}} ,  //now logged in user won't be visible in the userlist
  console.log(req.user.userName , "username");
  const { filter } = req.query;
  console.log(filter);
  const users = await User.find({ userName : {$ne : req.user.userName},
    $expr: {
      $regexMatch: {
        input: {
          $concat: ["$firstName", "$lastName" , "$userName"],
        },
        regex: filter || "",
        options: "i",
      },
    },
  })
    .limit()
    .sort({ createdAt: -1 })
    .exec();

 return res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    users,
    
  });
});

router.put("/updateUser", auth, async (req, res) => {
  try {
    const body = req.body;
    const { userName, firstName, lastName, password } = req.body;
    const findUser = await User.find({ userName });
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await User.findOneAndUpdate(
      { id: findUser._id },
      { firstName, lastName, userName, password: hashedPassword } , {new : true}
    );

    return res.status(200).json({
        success: true,
        message: "User Updated Successfully",
        user : updateUser,
      });

  } catch (error) {
    console.log(error , "error");
    return res.status(404).json({
        success: false,
        message: "Something went wrong",
      });
  }
});

module.exports = router;
