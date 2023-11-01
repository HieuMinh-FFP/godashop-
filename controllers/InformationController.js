
class InformationController {
    // chinh sach tra hang
    static returnPolicy = async (req, res) => {
        try {

            res.render('information/returnPolicy', {

            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    };
    // chinh sach thanh toan
    static paymentPolicy = async (req, res) => {
        try {

            res.render('information/paymentPolicy', {

            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }

    static deliveryPolicy = async (req, res) => {
        try {

            res.render('information/deliveryPolicy', {

            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }
}


module.exports = InformationController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params