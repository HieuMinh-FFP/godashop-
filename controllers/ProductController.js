const productModel = require('../models/Product');
const categoriesModel = require('../models/Category');
const commentModel = require('../models/Comment');
class ProductController {

    static index = async (req, res) => {
        try {
            const page = req.query.page || 1;
            const item_per_page = process.env.PRODUCT_ITEM_PER_PAGE;
            let conds = []; // khong can dieu kien
            let sorts = [];

            // tim kiem theo danh muc
            // danh-muc/kem-chong-nang/c3.html
            const category_id = req.params.category_id;
            if (category_id) {
                conds = {
                    'category_id': {
                        'type': '=',
                        'val': category_id
                    }
                }
            };
            // select*from view_product where category_id =3
            // ?price-ranger =500000-100000
            const priceRange = req.query['price-range'];
            if (priceRange) {
                const temp = priceRange.split("-");
                const start = temp[0];
                const end = temp[1];
                conds = {
                    ...conds,
                    'sale_price': {
                        'type': 'BETWEEN',
                        'val': `${start} AND ${end}`
                    }
                };
                if (end == 'greater') {
                    conds = {
                        ...conds,
                        'sale_price': {
                            'type': '>=',
                            'val': `${start}`
                        }
                    }
                };

            };
            // SELECT * FROM view_product WHERE sale_price BETWEEN 50000 and 1000000
            // let sorts = {featured: 'DESC'};
            const sort = req.query.sort;
            if (sort) {

                const temp = sort.split("-");
                const dummyColName = temp[0]; // price
                const order = temp[1].toUpperCase(); //asc => ASC
                const map = {
                    price: 'sale_price',
                    alpha: 'name',
                    created: 'created_date'
                }
                // console.log(map[dummyColName]);
                const colName = map[dummyColName];
                // can chuyen gia tri bien thanh thuoc tinh thi dung dau []
                sorts = {
                    //sale_price : ASC
                    [colName]: order
                }

                // SELECT * FROM view_product ORDER BY sale_price ASC
            }
            //search=kem
            const search = req.query.search;
            if (search) {
                conds = {
                    name: {
                        type: 'LIKE',
                        val: `'%${search}%'`
                    }
                }
            }
            // SELECT * FROM view_product where name LIKE '%kem%'
            const products = await productModel.getBy(conds, sorts, page, item_per_page);
            // tim totalPage
            const allProducts = await productModel.getBy(conds, sorts);
            const totalPage = Math.ceil(allProducts.length / item_per_page);
            const categories = await categoriesModel.all();
            // select * FROM view_product ORDER BY featured DESC LIMIT 0, 4
            // sorts ={ created_date:'DESC'};
            // const latestProduct = await productModel.getBy(conds, sorts, page, item_per_page);
            res.render('product/index', {
                products: products,
                categories: categories,
                category_id: category_id,
                priceRange: priceRange,
                sort: sort,
                totalPage: totalPage,
                page: page,
                search: search
            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }
    //// cai moi
    static detail = async (req, res) => {
        try {
            // sau / thi dung params
            const slug = req.params.slug;
            const temp = slug.split('-');
            const id = temp[temp.length - 1];
            // console.log(temp);
            // console.log(id);
            const product = await productModel.find(id);
            const imageItems = await product.getImageItems();
            const brand = await product.getBrand();
            const comments = await product.getComments();
            const category_id = product.category_id;
            const conds = {
                'category_id': {
                    'type': '=',
                    'val': product.category_id
                },
                'id': {
                    'type': '!=',
                    'val': product.id
                }
                // select * from view_product where category_id =3 and id !=2
            }
            const relateProducts = await product.getBy(conds);
            const categories = await categoriesModel.all();

            res.render('product/detail', {
                product: product,
                imageItems: imageItems,
                brand: brand,
                comments: comments,
                relateProducts: relateProducts,
                category_id: category_id,
                categories: categories

            });
        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }
    static storeComment = async (req, res) => {
        try {
            // sau / thi dung params

            const data = {
                product_id: req.body.product_id,
                email: req.body.email,
                fullname: req.body.fullname,
                star: req.body.rating,
                created_date: req.app.locals.helpers.getCurrentDateTime(),
                description: req.body.description
                // muon su dung helper của mình thì gi như req.app.locals.helpers( vì view ghi thế)
            }
            await commentModel.save(data)
            const product = await productModel.find(data.product_id);
            const comments = await product.getComments();
            res.render('product/comments', {
                comments: comments,
                layout: false
            });

        } catch (error) {
            // students.forEach((student,index)=>{
            res.status(500).send(error.message);
            // })
        }
    }

}
module.exports = ProductController;
// adfsf
// co 3 phuong phap lay du lieu
// body
//params