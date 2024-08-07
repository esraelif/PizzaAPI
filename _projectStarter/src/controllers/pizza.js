"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const Pizza = require("../models/pizza")
module.exports = {
    list: async (req, res) => {
        const data = await res.getModelList(Pizza)
        res.status(200).send({
            error: false,
            details: await res.getModelListDetails,
            data
        })
    },
    //CRUD
    create: async (req, res) => {
        /*
                #swagger.tags = ["Pizzas"]
                #swagger.summary = "Create Pizza"
            */

        // console.log(req.file) //* single file
        console.log(req.files);
        console.log(req.body);
        if (req.files) {
            const images = [];
            req.files.forEach((image) => images.push("/uploads/" + image.filename)); //* upload ile gelen resimlerin ismini yakaladık
            //* db ye kaydetmek için req.body ye ekliyoruz
            req.body.images = req.body.images
                ? Array.isArray(req.body.images)
                    ? [...req.body.images, ...images]
                    : [req.body.images, ...images]
                : images; //* aynı anda hem string hem de upload olarak gönderebilsin
        }

        const data = await Pizza.create(req.body);
        res.status(201).send({
            error: false,
            data,
        });
    },
    read: async (req, res) => {
        const data = await Pizza.findOne({ _id: req.params.id })
        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        /*
                #swagger.tags = ["Pizzas"]
                #swagger.summary = "Update Pizza"
            */

        // const pizza = await Pizza.findOne(
        //   { _id: req.params.id },
        //   { _id: 0, images: 1 }
        // );
        const images = []
        // console.log(pizzaImages)
        //! db deki önceki resimleri silmesin onların üzerine eklesin
        // if (req.files) {
        //   req.files.forEach(
        //     (image) => pizza.images.push("/uploads/" + image.filename) //* önceki resimlerin üzerine ekledik.
        // );
        if (req.files) {
            req.files.forEach(
                (image) => images.push("/uploads/" + image.filename) //* önceki resimlerin üzerine ekledik.
            );
            // req.body.images = req.body.images
            //   ? Array.isArray(req.body.images)
            //     ? [...req.body.images, ...pizza.images]
            //     : [req.body.images, ...pizza.images]
            //   : pizza.images;
        }
        // else if(req.body.images) {//* kullanıcı upload etmeden string olarak da resim url i gönderebilir.
        //   if(Array.isArray(req.body.images)) {
        //     req.body.images = [...req.body.images, ...pizza.images];
        //   }else {
        //     req.body.images = [req.body.images, ...pizza.images];
        //   }
        // }
        //* yukarıdaki örnekte update edilecekler arasına yeni resim yoksa resimleri eklemedik. 
        // req.body.images = req.body.images
        //   ? Array.isArray(req.body.images)
        //     ? [...req.body.images, ...pizza.images]
        //     : [req.body.images, ...pizza.images]
        //   : pizza.images;
        //* resim upload edildiyse veya string olarak resim yollandıysa 
        if (req.body.images || images.length > 0) {
            req.body.images = req.body.images
                ? Array.isArray(req.body.images)
                    ? [...req.body.images, ...images]
                    : [req.body.images, ...images]
                : images;
        }
        //! önceki pizzaya ait resim dosyaları kaldırılabilir.


        const data = await Pizza.updateOne({ _id: req.params.id }, req.body, {
            runValidators: true,
        });
        res.status(202).send({
            error: false,
            data,
            newData: await Pizza.findOne({ _id: req.params.id }),
        });
    },
    delete: async (req, res) => {
        const data = await Pizza.deleteOne({ _id: req.params.id })
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data,
            message: "Pizza not found"
        }
        )
    }
}