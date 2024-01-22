const express = require("express");
const { auth } = require("../middlewares/auth");
const Bank = require("../models/Bank");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", auth, async (req, res) => {
  const { id } = req.user;
  const getBalance = await Bank.findOne({ userId: id });
  return res.status(200).json({
    message: "Balance fetched successfully",
    balance: getBalance.balance,
  });
});

router.post("/transfer", auth, async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   const { id } = req.user;
//   const { recieversId, amount } = req.body;

//   const getBalance = await Bank.findOne({ userId: id }).session(session);
//   console.log(getBalance.balance, "getBalance");
//   const recBalance = await Bank.findOne({ userId: recieversId }).session(
//     session
//   );

//   if (id === recieversId) {
//     return res.status(400).json({
//       message: "You can not transfer balance to your own account",
//     });
//   }

//   if (getBalance.balance < amount) {
//     return res.status(400).json({
//       message: "Insufficient Balance",
//     });
//   }
//   const updateSenderBalance = getBalance.balance - amount;
//   //  console.log(updateSenderBalance , typeof updateSenderBalance , "ash");
//   const updateSender = await Bank.findOneAndUpdate(
//     { userId: id },
//     { balance: updateSenderBalance }
//   ).session(session);

//   const updateReciverBalance = recBalance.balance + amount;

//   const updateReciever = await Bank.findOneAndUpdate(
//     { userId: recieversId },
//     { balance: updateReciverBalance }
//   ).session(session);

//   await session.commitTransaction();

//   if (updateSender && updateReciever) {
//     return res.status(200).json({
//       message: "Funds transferred successfully",
//     });
//   }

const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Bank.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Bank.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Bank.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Bank.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transfer successful"
    })
});

module.exports = router;
