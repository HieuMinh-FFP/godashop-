const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const ProductController = require('../controllers/ProductController');
const InformationController = require('../controllers/InformationController');
const ContactController = require('../controllers/ContactController');
const AuthController = require('../controllers/AuthController');
const CustomerController = require('../controllers/CustomerController');
const CartController = require('../controllers/CartController');
// hien thi danh sach sinh vien
router.get('/', HomeController.index);
router.get('/san-pham.html', ProductController.index);
// hien thi danh muc san pham
// slug va category_id la do ta dat
// : vd :slug là 1 quy dinh, bien chinh sua
// danh-muc/kem-chong-nang/c3.html
router.get('/danh-muc/:slug/c:category_id.html', ProductController.index);
// tim kiem
router.get('/search', ProductController.index);
// chinh - sach - doi - tra
router.get('/chinh-sach-doi-tra.html', InformationController.returnPolicy);
router.get('/chinh-sach-thanh-toan.html', InformationController.paymentPolicy);
router.get('/chinh-sach-giao-hang.html', InformationController.deliveryPolicy);
router.get('/lien-he.html', ContactController.form);
// goi email
router.post('/contact/sendEmail', ContactController.sendEmail);

//lien-he.html
// chi tiet san pham
router.get('/san-pham/:slug.html', ProductController.detail);
// luu danh gia (ajax)
router.post('/comments', ProductController.storeComment);
router.post('/login', AuthController.login);
router.get('/thong-tin-tai-khoan.html', CustomerController.show);
// Cannot GET /thong-tin-tai-khoan.html
router.get('/dia-chi-giao-hang-mac-dinh.html', CustomerController.shippingDefault);
// cart
router.get('/cart/add', CartController.add);
// khong dùng tới
router.get('/cart/get', CartController.get);
router.get('/cart/update', CartController.update);
router.get('/cart/delete', CartController.delete);
///dia-chi-giao-hang-mac-dinh.html
module.exports = router;
// const express = require('express');
// const router = express.Router();