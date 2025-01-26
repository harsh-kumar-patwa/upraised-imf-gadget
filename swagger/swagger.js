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
      },
    security: [{
      BearerAuth: []
    }]
  },
  apis: ['./routes/*.js', './controllers/*.js'] 
};

module.exports = swaggerJSDoc(options);