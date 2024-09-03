import authenticationRoutes from "./authenticationRoutes.js";

export default function initializeRoutes(app) {
    // Use the authentication routes
    app.use('/authentication', authenticationRoutes);

}
