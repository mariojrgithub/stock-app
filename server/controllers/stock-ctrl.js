const Stocks = require("../models/stock-model");

createStock = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a stock!"
    });
  }

  const stocks = new Stocks(body);

  if (!stocks) {
    return res.status(400).json({
      success: false,
      error: err
    });
  }

  stocks
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: stocks._id,
        message: "Stock created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "Stock not created!"
      });
    });
};

updateStock = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  Stocks.findOne({ _id: req.params.id }, (err, stocks) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "Stock not found!"
      });
    }
    stocks.symbol = body.symbol;
    stocks.open = body.open;
    stocks.high = body.high;
    stocks.low = body.low;
    stocks.volume = body.volume;
    stocks.close = body.close;
    stocks.date = body.date;
    stocks.NOTE = body.NOTE;

    stocks
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: stocks._id,
          message: "Stock updated!"
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: "Stock not updated!"
        });
      });
  });
};

deleteStock = async (req, res) => {
  await Stocks.findOneAndDelete({ _id: req.params.id }, (err, stocks) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!stocks) {
      return res.status(404).json({
        success: false,
        error: "Stock not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: stocks
    });
  }).catch(err => console.log(err));
};

getStockById = async (req, res) => {
  await Stocks.findOne({ _id: req.params.id }, (err, stocks) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!stocks) {
      return res.status(404).json({
        success: false,
        error: "Stock not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: stocks
    });
  }).catch(err => console.log(err));
};

getStocks = async (req, res) => {
  await Stocks.find({}, (err, stocks) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!stocks.length) {
      return res.status(404).json({
        success: false,
        error: "Stocks not found!"
      });
    }
    return res.status(200).json({
      success: true,
      data: stocks
    });
  }).catch(err => console.log(err));
};

module.exports = {
  createStock,
  updateStock,
  deleteStock,
  getStocks,
  getStockById
};
