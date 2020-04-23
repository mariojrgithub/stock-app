const PickTransactions = require("../models/picktransactions-model");

createPickTransactions = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a transaction!"
    });
  }

  const picktransactions = new PickTransactions(body);

  if (!picktransactions) {
    return res.status(400).json({
      success: false,
      error: err
    });
  }

  if (body.TYPE == "SALE") {
    picktransactions.REALIZED_GAIN_LOSS = (
      body.NET_PROCEEDS - body.TOT_COST
    ).toFixed(2);
  } else {
    picktransactions.TOT_COST = (body.SHARES * body.COST_PER_SHARE).toFixed(2);
    picktransactions.VALUE = (body.PRICE * body.SHARES).toFixed(2);
    picktransactions.NET_PROCEEDS = body.NET_PROCEEDS;
    picktransactions.REALIZED_GAIN_LOSS =
      picktransactions.VALUE - picktransactions.TOT_COST;
  }

  picktransactions
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: picktransactions._id,
        message: "Transaction created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Transaction not created!"
      });
    });
};

updatePickTransactions = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  PickTransactions.findOne({ _id: req.params.id }, (err, picktransactions) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Transaction not found!"
      });
    }
    picktransactions.STK = body.STK;
    picktransactions.PORT = body.PORT;
    picktransactions.SYM = body.SYM;
    picktransactions.DATE = body.DATE;
    picktransactions.SHARES = body.SHARES;
    picktransactions.COST_PER_SHARE = body.COST_PER_SHARE;
    picktransactions.PRICE = body.PRICE;
    picktransactions.TOT_COST =
      picktransactions.SHARES * picktransactions.COST_PER_SHARE;

    picktransactions.VALUE = picktransactions.SHARES * picktransactions.PRICE;

    picktransactions.TYPE = body.TYPE;

    if (body.TYPE == "SALE") {
      picktransactions.REALIZED_GAIN_LOSS = (
        body.NET_PROCEEDS - picktransactions.TOT_COST
      ).toFixed(2);
      picktransactions.NET_PROCEEDS = body.NET_PROCEEDS;
      picktransactions.COST_PER_SHARE = "";
      picktransactions.PRICE = "";
      picktransactions.VALUE = "";
    } else {
      picktransactions.REALIZED_GAIN_LOSS =
        picktransactions.VALUE - picktransactions.TOT_COST;
      picktransactions.NET_PROCEEDS = body.NET_PROCEEDS;
    }
    picktransactions.BROKER = body.BROKER;
    picktransactions.COMMENT1 = body.COMMENT1;
    picktransactions.COMMENT2 = body.COMMENT2;
    picktransactions.COMMENT3 = body.COMMENT3;

    picktransactions
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: picktransactions._id,
          message: "Transaction updated!"
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: "Transaction not updated!"
        });
      });
  });
};

deletePickTransactions = async (req, res) => {
  await PickTransactions.findOneAndDelete(
    { _id: req.params.id },
    (err, picktransactions) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err
        });
      }

      if (!picktransactions) {
        return res.status(404).json({
          success: false,
          error: "Transaction not found!"
        });
      }

      return res.status(200).json({
        success: true,
        data: picktransactions
      });
    }
  ).catch(err => console.log(err));
};

getPickTransactionsById = async (req, res) => {
  await PickTransactions.findOne(
    { _id: req.params.id },
    (err, picktransactions) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err
        });
      }

      if (!picktransactions) {
        return res.status(404).json({
          success: false,
          error: "Transaction not found!"
        });
      }

      return res.status(200).json({
        success: true,
        data: picktransactions
      });
    }
  ).catch(err => console.log(err));
};

getPickTransactions = async (req, res) => {
  await PickTransactions.find({}, (err, picktransactions) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!picktransactions.length) {
      return res.status(404).json({
        success: false,
        error: "Transactions not found!"
      });
    }
    return res.status(200).json({
      success: true,
      data: picktransactions
    });
  }).catch(err => console.log(err));
};

module.exports = {
  createPickTransactions,
  updatePickTransactions,
  deletePickTransactions,
  getPickTransactions,
  getPickTransactionsById
};
