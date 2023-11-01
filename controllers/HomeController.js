const productModel = require('../models/Product');
const categoriesModel = require('../models/Category');

class HomeController {

    static index = async (req, res) => {
        try {
            const page = 1;
            const item_per_page = 4;
            const conds = []; // khong can dieu kien
            let sorts = { featured: 'DESC' };
            const featuredProducts = await productModel.getBy(conds, sorts, page, item_per_page);
            // select * FROM view_product ORDER BY featured DESC LIMIT 0, 4
            sorts = { created_date: 'DESC' };
            const latestProduct = await productModel.getBy(conds, sorts, page, item_per_page);
            // select * FROM view_product ORDER BY create_date DESC LIMIT 0, 4

            // Lấy sản phẩm theo danh mục
            //dùng dể chưa tất cả danh mục
            // mỗi danh mục mình có 2 phần: tên danh mục và sản phẩm kèm theo
            const categoryProducts = [];
            // Lấy tất cả các danh mục
            const categories = await categoriesModel.all();
            //forof
            //Duyet tung cat de lay ten san phẩm tương ứng
            for (const category of categories) {
                const categoryName = category.name;
                const conds = {
                    'category_id': {
                        'type': '=',
                        'val': category.id
                    }
                }
                //SELECT *FROM view_product Where category_id =3
                const products = await productModel.getBy(conds, sorts, page, item_per_page);
                //Thêm tên danh mục và sản phẩm tương ứng để truyền qua view
                categoryProducts.push({
                    categoryName: categoryName,
                    products: products
                })
            }

            res.render('home/index', {
                featuredProducts: featuredProducts,
                latestProduct: latestProduct,
                categoryProducts: categoryProducts,


            });

        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }


}
module.exports = HomeController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params