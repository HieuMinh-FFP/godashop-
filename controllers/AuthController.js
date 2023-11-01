const session = require('express-session');
const customerModel = require('../models/Customer');
const bcrypt = require('bcrypt');
class AuthController {
    // chinh sach tra hang
    static login = async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const customer = await customerModel.findEmail(email);
            if (!customer) {
                //neu khogn co customer thi :
                // req.app.locals.session.message_error = `Lỗi không tồn tại ${email} trong hệ thống`;
                req.session.message_error = `Lỗi không tồn tại ${email} trong hệ thống`;
                req.session.save(() => {
                    res.redirect('/');
                });
                // controller lay du lieu session
                return;
            }
            if (!bcrypt.compareSync(password, customer.password)) {
                // bcrypt.compareSync(myPlaintextPassword, hash)
                req.session.message_error = ` Lỗi : mật khẩu không đúng`;
                // sau khi session duoc luu , thi se dieu huong den trangchu
                req.session.save(() => {
                    res.redirect('/')
                });
                return;
            }
            if (!customer.is_active) {
                // bcrypt.compareSync(myPlaintextPassword, hash)
                req.session.message_error = ` Lỗi : tai khoản chua duoc kich hoat , vui long kiem tra email`;
                // sau khi session duoc luu , thi se dieu huong den trangchu
                req.session.save(() => {
                    res.redirect('/')
                });
                return;
            }
            req.session.name = customer.name;
            req.session.email = customer.email;
            req.session.message_success = 'Đã đăng nhập thành công';
            req.session.save(() => {
                res.redirect('/')
            });

            // res.render('Auth/returnPolicy', {

            // });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    };
    // chinh sach thanh toan

}


module.exports = AuthController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params