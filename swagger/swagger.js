const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMF Gadget API',
      version: '1.0.0',
      description: 'Top-secret gadget management system for IMF agents',
      contact: {
        name: 'IMF Technical Support',
        email: 'kumar3446harsh@gmail.com'
      }
    },
    servers: [
      { 
        url: 'http://localhost:3000/api', 
        description: 'Local server' 
      },
      { 
        url: 'https://upraised-imf-gadget.onrender.com/api', 
        description: 'Production server' 
      }
    ],
    components: {
        securitySchemes: { 
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
        },
        schemas: {
          Gadget: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              status: { 
                type: 'string',
                enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned']
              },
              decommissionedAt: { type: 'string', format: 'date-time' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          },
          GadgetInput: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' }
            }
          },
          GadgetUpdate: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              status: { 
                type: 'string',
                enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned']
              }
            }
          }
        }
      },
    security: [{
      BearerAuth: []
    }]
  },
  apis: ['./routes/*.js', './controllers/*.js'] 
};

module.exports = swaggerJSDoc(options);