
class CustomerController {
    // chinh sach tra hang
    static show = async (req, res) => {
        try {
            res.render('customer/show', {
            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    };
    static shippingDefault = async (req, res) => {
        try {
            res.render('customer/shippingDefault', {
            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    };
    // chinh sach thanh toan

}


module.exports = CustomerController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params