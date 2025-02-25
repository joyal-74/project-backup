
import express from "express";
const router = express.Router();
import adminController from '../controllers/adminController.js';
import categoryController from '../controllers/categoryController.js'


router.get('/login', adminController.loadLogin);
router.post('admin/login', adminController.adminLogin);


router.get('/dashboard', adminController.loadDashboard);

// category Management
router.get('/categories', categoryController.categoryInfo);
router.post('/categories', categoryController.addCategory);
router.put('/categories', categoryController.editCategory);

router.get('/orders', adminController.loadOrders);
router.get('/vieworders', adminController.viewOrders);


router.get('/products', adminController.loadProducts);
router.get('/addProducts', adminController.addProducts);

router.get('/customers', adminController.loadCustomers);

export default router;