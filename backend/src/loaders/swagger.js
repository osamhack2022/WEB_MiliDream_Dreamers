import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'MiliDream backend API',
			version: '1.0.0',
		},
	},
	apis: ['./api/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function (app) {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}