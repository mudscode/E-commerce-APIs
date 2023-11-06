const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verify.js");
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", verifyTokenAndAuthorization, (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokeId,
      amount: req.body.amount,
      currency: "pkr",
    },
    (error, response) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(response);
      }
    }
  );
});

module.exports = router;
