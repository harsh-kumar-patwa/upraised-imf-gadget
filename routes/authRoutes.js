const router = require('express').Router();
const { login, refreshToken } = require('../controllers/authController');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login for IMF agents
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - agentId
 *               - password
 *             properties:
 *               agentId:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: secret
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 */
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Temporary route to create a test user
router.post('/create-test-user', async (req, res) => {
    const { agentId, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
        data: {
            agentId,
            passwordHash,
            role: 'admin'
        }
    });

    res.json(user);
  });

module.exports = router;