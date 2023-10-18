const Tool = require("../model/tool");

module.exports = class toolApi {
  static async regTool(req, res, next) {
    try {
      const tool = await Tool.create(req.body);
      res.status(201).json({
        success: true,
        tool,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getToolId(req, res, next) {
    try {
      const tool = await Tool.findById(req.params._id);
      res.status(200).json({
        tool,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getToolAll(req, res, next) {
    try {
      const tools = await Tool.find();
      res.status(200).json({
        tools,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getToolAvailable(req, res, next) {
    try {
      const tools = await Tool.find({ renterEmail: null });
      res.status(200).json({
        tools,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getToolSearch(req, res, next) {
    try {
      const tools = await Tool.find({
        $and: [
          { renterEmail: null },
          {
            $or: [
              { name: { $regex: new RegExp(req.params.search, "i") } },
              { category: { $regex: new RegExp(req.params.search, "i") } },
              { description: { $regex: new RegExp(req.params.search, "i") } },
            ],
          },
        ],
      });
      res.status(200).json({
        tools,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getToolFiltered(req, res, next) {
    try {
      let tools;
      const mode = req.params.mode;
      const attr = req.params.attr;
      const value1 = req.params.value1;
      const value2 = req.params.value2;
      switch (mode) {
        // Parameter matches single value
        case "match":
          tools = await Tool.find({ [attr]: value1 });
          res.status(200).json({
            tools,
          });
          break;
        case "between":
          tools = await Tool.find({ [attr]: { $gt: value1, $lt: value2 } });
          res.status(200).json({
            tools,
          });
          break;
        case "greater":
          tools = await Tool.find({ [attr]: { $gt: value1 } });
          res.status(200).json({
            tools,
          });
          break;
        case "lesser":
          tools = await Tool.find({ [attr]: { $lt: value1 } });
          res.status(200).json({
            tools,
          });
          break;
        // Sorting by price (low to high)
        case "priceLowToHigh":
          tools = await Tool.find({ renterEmail: null }).sort({ price: 1 });
          res.status(200).json({
            tools,
          });
          break;
        // Sorting by price (high to low)
        case "priceHighToLow":
          tools = await Tool.find({ renterEmail: null }).sort({ price: -1 });

          res.status(200).json({
            tools,
          });
          break;
        default:
          res.status(404).json({
            success: false,
            message: "No matching objects",
          });
          break;
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async delTool(req, res, next) {
    try {
      // Tests that the tool exists within the database before deletion. If not, throws an error
      const toolExists = await Tool.findById(req.params._id);
      if (toolExists == null) {
        res.status(404).json({
          success: false,
          message: "Object with id does not exist",
        });
      } else {
        const tool = await Tool.findByIdAndDelete(req.params._id);
        res.status(200).json({
          success: true,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async markToolDeleted(req, res, next) {
    try {
      const tool = await Tool.findByIdAndUpdate(req.params._id, {
        renterEmail: "Deleted",
      });
      const updatedTool = await Tool.findById(req.params._id);
      res.status(200).json({
        success: true,
        tool,
        updatedTool,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async rentTool(req, res, next) {
    try {
      const tool = await Tool.findByIdAndUpdate(req.params._id, {
        renterEmail: req.params.renterEmail,
      });
      const updatedTool = await Tool.findById(req.params._id);
      res.status(200).json({
        success: true,
        tool,
        updatedTool,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async editTool(req, res, next) {
    try {
      const tool = await Tool.findByIdAndUpdate(req.params._id, req.body);
      const updatedTool = await Tool.findById(req.params._id);
      res.status(200).json({
        success: true,
        tool,
        updatedTool,
      });
    } catch (error) {
      console.log(err);
      next(err);
    }
  }

  static async stopRental(req, res, next) {
    try {
      const tool = await Tool.findOneAndUpdate({_id:req.params._id}, {renterEmail: null});
      res.status(200).json({
        success: true,
        tool,
      });
    } catch (error) {
      console.log(err);
      next(err);
    } 
  }
};
