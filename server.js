require("dotenv").config();

const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('./package');
const Path = require('path');
const Models = require('./models/index');
const UniversalFunctions = require('./utils/universal');
const Constants = require('./config/constants');

const server = new Hapi.server({
	host: process.env.NODE_HOST,
	port: process.env.NODE_PORT,
	routes: {
		cors: {
			origin: ['*'],
			headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match',"language"],
			additionalHeaders: ["Access-Control-Allow-Origin","Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type"]
		}
	}
});

const init = async function () {
	const swaggerOptions = {
		info: {
			title: process.env.PROJECT_TITLE,
			version: Pack.version
		},
		securityDefinitions: {
			Bearer: {
				type: "apiKey",
				name: "Authorization",
				in: "header"
			}
		},
		schemes: ["http", "https"],
		grouping: "tags",
		sortEndpoints: "ordered",
		consumes: ["application/json"],
		produces: ["application/json"]
	};
	console.log("Register swagger for API documentation...");
	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions
		}
	]);
	try {
		console.log("Register jwt library");
		await server.register(require("hapi-auth-jwt2"));
		server.auth.strategy("jwt", "jwt", {
			complete: true,
			key: Constants.key.privateKey, // secret key
			validate: UniversalFunctions.validateToken, // validate function defined in Universal function for checking
			verifyOptions: { algorithms: ["HS256"] } // algorithm
		});
		server.auth.default("jwt");

		await server.register({
			plugin: require("hapi-auto-route"),
			options: {
				routes_dir: Path.join(__dirname, "routes")
			}
		});

		console.log("Checking DB connectivity...");
		try {
			await Models.sequelize.authenticate();
		} catch (err) {
			console.log("Connection to db could not be established", err);
			process.exit();
		}
		console.log("Register proxy h2o2...");
		await server.register({ plugin: require("@hapi/h2o2") });

		
		console.log("Synchronizing models...");
		Models.sequelize.sync().then(() => {
			server.start(() => {
				console.log(
						"Hapi server for geekDoor user servicestarted @",
						server.info.uri
				);
			});
		});

		
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log("Server running at:", server.info.uri);
};
init();
