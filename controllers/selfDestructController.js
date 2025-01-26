const { StatusCodes } = require('http-status-codes');
const gadgetService = require('../services/gadgetService');
const { generateConfirmationCode } = require('../utils/codenameGenerator');

exports.initiateSelfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await gadgetService.getGadgetById(id);
    
    if (!gadget) {
      return res.status(StatusCodes.NOT_FOUND).json({ 
        error: 'Gadget not found' 
      });
    }
    
    if (gadget.status === 'Decommissioned') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'Gadget already decommissioned'
      });
    }

    // Actually destroy the gadget
    await gadgetService.destroyGadget(id);
    
    const confirmationCode = generateConfirmationCode();
    res.status(StatusCodes.OK).json({
      message: 'Self-destruct sequence initiated',
      confirmationCode,
      countdown: 60
    });
    
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      error: error.message 
    });
  }
};