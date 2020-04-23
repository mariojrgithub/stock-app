const BBros = require("../models/bbros-model");

createBBros = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide an entry!"
    });
  }

  const bbros = new BBros(body);

  if (!bbros) {
    return res.status(400).json({
      success: false,
      error: err
    });
  }

  bbros.TOTAL_AMOUNT = (body.UNIT_COST * body.NO_OF_SHARES).toFixed(2);
  bbros.VALUE = (body.PRICE * body.NO_OF_SHARES).toFixed(2);
  bbros.GAIN_LOSS = (bbros.VALUE - bbros.TOTAL_AMOUNT).toFixed(2);
  bbros.PERCENT_RETURN = ((bbros.GAIN_LOSS / bbros.TOTAL_AMOUNT) * 100).toFixed(
    2
  );

  bbros
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: bbros._id,
        message: "Entry created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Entry not created!"
      });
    });
};

updateBBros = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  BBros.findOne({ _id: req.params.id }, (err, bbros) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Entry not found!"
      });
    }
    bbros.PORTFOLIO = body.PORTFOLIO;
    bbros.STOCK_NAME = body.STOCK_NAME;
    bbros.PURCHASE_DATE = body.PURCHASE_DATE;
    bbros.SYMBOL = body.SYMBOL;
    bbros.NO_OF_SHARES = body.NO_OF_SHARES;
    bbros.UNIT_COST = body.UNIT_COST;
    bbros.TOTAL_AMOUNT = (body.UNIT_COST * body.NO_OF_SHARES).toFixed(2);
    bbros.PRICE = body.PRICE;
    bbros.VALUE = (body.PRICE * body.NO_OF_SHARES).toFixed(2);
    bbros.GAIN_LOSS = (bbros.VALUE - bbros.TOTAL_AMOUNT).toFixed(2);
    bbros.PERCENT_RETURN = (
      (bbros.GAIN_LOSS / bbros.TOTAL_AMOUNT) *
      100
    ).toFixed(2);
    bbros.REPORT_DATE = body.REPORT_DATE;
    bbros.BROKER = body.BROKER;
    bbros.COMMENT1 = body.COMMENT1;
    bbros.COMMENT2 = body.COMMENT2;
    bbros.COMMENT3 = body.COMMENT3;

    bbros
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: bbros._id,
          message: "Entry updated!"
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: "Entry not updated!"
        });
      });
  });
};

deleteBBros = async (req, res) => {
  await BBros.findOneAndDelete({ _id: req.params.id }, (err, bbros) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!bbros) {
      return res.status(404).json({
        success: false,
        error: "Entry not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: bbros
    });
  }).catch(err => console.log(err));
};

getBBrosById = async (req, res) => {
  await BBros.findOne({ _id: req.params.id }, (err, bbros) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!bbros) {
      return res.status(404).json({
        success: false,
        error: "Entry not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: bbros
    });
  }).catch(err => console.log(err));
};

getBBros = async (req, res) => {
  await BBros.find({}, (err, bbros) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!bbros.length) {
      return res.status(404).json({
        success: false,
        error: "Entries not found!"
      });
    }
    return res.status(200).json({
      success: true,
      data: bbros
    });
  }).catch(err => console.log(err));
};

module.exports = {
  createBBros,
  updateBBros,
  deleteBBros,
  getBBros,
  getBBrosById
};
