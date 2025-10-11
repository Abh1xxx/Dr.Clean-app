const { createService, getAllServices, getServiceById, updateService, deleteService } = require('../../Controllers/serviceController');
const checkAdminAuth = require('../../Middleware/adminAuthMW');
const { authMiddleware } = require('../../Middleware/authMiddleware');
const upload = require('../../Middleware/multer');

const ServiceRoutes = require('express').Router();

ServiceRoutes.post("/createService",checkAdminAuth, upload.single("image"),createService);
ServiceRoutes.get("/getAllServices", getAllServices);
ServiceRoutes.get("/getServiceById/:id", getServiceById);
ServiceRoutes.put("/updateService/:id",checkAdminAuth, upload.single("image"), updateService);
ServiceRoutes.delete("/deleteService/:id",checkAdminAuth, deleteService);

module.exports= ServiceRoutes;
