const router = require('express').Router();
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const { apiLimiter } = require('../middlewares/rateLimit');
const {
  getAllGadgets,
  createGadget,
  updateGadget,
  decommissionGadget
} = require('../controllers/gadgetController');
const { initiateSelfDestruct } = require('../controllers/selfDestructController');

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: IMF Gadget Management
 */

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Get all gadgets
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: List of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gadget'
 */
router.get('/gadgets', getAllGadgets);

/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Create a new gadget
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Gadget created (Generated  name using Gemini)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gadget'
 */
router.use(authenticate, authorizeRoles('admin'));
router.post('/gadgets', createGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GadgetUpdate'
 *     responses:
 *       200:
 *         description: Gadget updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gadget'
 */
router.patch('/gadgets/:id', updateGadget);

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Decommission a gadget
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     responses:
 *       200:
 *         description: Gadget decommissioned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gadget'
 */
router.delete('/gadgets/:id', decommissionGadget);

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Initiate self-destruct sequence
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     responses:
 *       200:
 *         description: Self-druct initiated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 confirmationCode:
 *                   type: string
 *                 countdown:
 *                   type: number
 */
router.post('/gadgets/:id/self-destruct', initiateSelfDestruct);
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *     NotFoundError:
 *       description: The requested resource was not found
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *             message:
 *               type: string
 *             timestamp:
 *               type: string
 *               format: date-time
 */

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Initiate self-destruct sequence
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The gadget ID
 *     responses:
 *       200:
 *         description: Self-destruct initiated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 confirmationCode:
 *                   type: string
 *                 countdown:
 *                   type: integer
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
module.exports = router;