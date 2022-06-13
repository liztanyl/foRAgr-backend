export default function bindRoutes(app) {
	app.get("/", (request, response) => {
		response.sendFile(resolve("dist", "main.html"));
	});
}
