const PickFile = require("../models/pickfilesystem-model");

createPickFile = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a file!"
    });
  }

  const pickfile = new PickFile(body);

  if (!pickfile) {
    return res.status(400).json({
      success: false,
      error: err
    });
  }

  pickfile
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: pickfile._id,
        message: "File created!"
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: "File not created!"
      });
    });
};

updatePickFile = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update"
    });
  }

  PickFile.findOne({ _id: req.params.id }, (err, pickfile) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "File not found!"
      });
    }
    pickfile.CAB_DRWR = body.CAB_DRWR;
    pickfile.TYPE = body.TYPE;
    pickfile.ENTITY = body.ENTITY;
    pickfile.DESCRIPTION = body.DESCRIPTION;
    pickfile.ID_NUMB - body.ID_NUMB;
    pickfile.DATE = body.DATE;

    pickfile
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: pickfile._id,
          message: "File updated!"
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: "File not updated!"
        });
      });
  });
};

deletePickFile = async (req, res) => {
  await PickFile.findOneAndDelete({ _id: req.params.id }, (err, pickfile) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!pickfile) {
      return res.status(404).json({
        success: false,
        error: "File not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: pickfile
    });
  }).catch(err => console.log(err));
};

getPickFileById = async (req, res) => {
  await PickFile.findOne({ _id: req.params.id }, (err, pickfile) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!pickfile) {
      return res.status(404).json({
        success: false,
        error: "File not found!"
      });
    }

    return res.status(200).json({
      success: true,
      data: pickfile
    });
  }).catch(err => console.log(err));
};

getPickFiles = async (req, res) => {
  await PickFile.find({}, (err, pickfile) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }

    if (!pickfile.length) {
      return res.status(404).json({
        success: false,
        error: "Files not found!"
      });
    }
    return res.status(200).json({
      success: true,
      data: pickfile
    });
  }).catch(err => console.log(err));
};

module.exports = {
  createPickFile,
  updatePickFile,
  deletePickFile,
  getPickFiles,
  getPickFileById
};
