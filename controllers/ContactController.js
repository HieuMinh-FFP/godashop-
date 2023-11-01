
class ContactController {
    // chinh sach tra hang
    static form = async (req, res) => {
        try {
            res.render('contact/form', {
            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    };
    // chinh sach thanh toan
    static sendEmail = async (req, res) => {
        try {
            // req.protocol là giao thuc vd http
            //  req.headers.host vd godashop.com
            const web = `${req.protocol}://${req.headers.host}`;
            const to = process.env.SHOP_OWNER;
            const subject = 'godashop-lien he';
            const content = `
            Chào chủ của hàng, <br>
            Dưới đây là thông tin khách hàng liên hệ:<br>
            Tên: ${req.body.fullname}<br>
            Email: ${req.body.email}<br>
            Mobile: ${req.body.mobile}<br>
            Message: ${req.body.content}<br>
            được gửi từ trang web: ${web}
            `;
            req.app.locals.helpers.sendEmail(to, subject, content)
            res.end(' Gui mail khong co dau')
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }

    static deliveryPolicy = async (req, res) => {
        try {

            res.render('Contact/deliveryPolicy', {

            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }
}


module.exports = ContactController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params