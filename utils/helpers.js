const numeral = require('numeral');
require('numeral/locales/vi');
const slugify = require('slugify');
numeral.locale('vi');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

exports.formatMoney = (money) => {
    return numeral(money).format('0,0');
}
exports.genRouteCategory = (category) => {
    // danh-muc/kem-chong-nang/c3.html
    const slug = slugify(category.name, { lower: true });
    const category_id = category.id
    return `/danh-muc/${slug}/c${category_id}.html`;
}
exports.getCurrentRoute = (path) => {
    // xoa dau / dang truoc path
    // vd: /san-pham. html
    // patch.slice(1) là lấy cắt chuỗi từ 1 vị trí 1 trở đi
    path = path.startsWith('/') ? path.slice(1) : path;
    // trang chu
    if (path === '') {
        return 'home';
        // trang danh sách sản phẩm
        // dấu // là biêu thức chính quy(regular expression)
        // dấu ^ là bắt đầu, dấu $ là kết thúc
    } if (path.match(/^san-pham.html$/)) {
        return 'product';
    }
    // tim kiem theo danh muc
    if (path.match(/^danh-muc/)) {
        return 'category';
    }
    // tim kiem theo từ khóa
    if (path.match(/^search/)) {
        return 'search';
    }
    //lien-he.html
    if (path.match(/^lien-he.html$/)) {
        return 'contact';
    }
    if (path.match(/^chinh-sach-doi-tra.html$/)) {
        return 'returnPolicy';
    }
    if (path.match(/^chinh-sach-thanh-toan.html$/)) {
        return 'paymentPolicy';
    }
    if (path.match(/^chinh-sach-giao-hang.html$/)) {
        return 'deliveryPolicy';
    }


}
// hàm nay dung de gui mail
exports.sendEmail = async (to, subject, content) => {
    const nodemailer = require("nodemailer");
    // cau hinh
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_SECRET, // khong phai mat khau
        },
    });
    await transporter.sendMail({
        from: process.env.SMTP_USERNAME, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: content, // html body
    });

}


exports.genRouteProductDetail = (product) => {
    // danh-muc/kem-chong-nang/c3.html
    const slug = slugify(product.name, { lower: true });
    const id = product.id;
    return `/san-pham/${slug}-${id}.html`;
}
exports.santitizeData = (data) => {
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(data);
    // console.log(window);
    return clean
}
exports.getCurrentDateTime = () => {
    const { format } = require("date-fns");
    return format(new Date(), 'yyyy-MM-dd H:i:s');
}