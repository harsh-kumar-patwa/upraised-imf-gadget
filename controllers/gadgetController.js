const gadgetService = require('../services/gadgetService');
const { StatusCodes } = require('http-status-codes');
const  generateSuccessProbability  = require('../utils/generateSuccessProbability');

exports.getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const gadgets = await gadgetService.getGadgets(status);
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget,
      missionSuccessProbability: generateSuccessProbability()
    }));
    res.status(StatusCodes.OK).json(gadgetsWithProbability);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.createGadget = async (req, res) => {
  try {
    const gadget = await gadgetService.createGadget();
    res.status(StatusCodes.CREATED).json(gadget);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.updateGadget = async (req, res) => {
  try {
    const gadgetExist = await gadgetService.getGadgetById(req.params.id);
    if (!gadgetExist) {
      throw new Error('Gadget with this ID does not exist');
    }
    const gadget = await gadgetService.updateGadget(req.params.id, req.body);
    res.status(StatusCodes.OK).json(gadget);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

exports.decommissionGadget = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('Gadget ID is required');
    }
    const gadgetExist = await gadgetService.getGadgetById(id);
    if (!gadgetExist) {
      throw new Error('Gadget ID does not exist');
    }
    const gadget = await gadgetService.decommissionGadget(req.params.id);
    res.status(StatusCodes.OK).json(gadget);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};