const asyncHandler = require('express-async-handler');
const ProduitSchema = require('../Models/ProduitModel');

// method : post
// url : /api/produit
// access : public
// add produit
const addProduit = asyncHandler(async (req, res) => {

    const { image,title, description, price, oldprice, quantite, promotion,categorieId } = req.body
    // console.log(title)
    // console.log(req.files.image);

    // condition add les inputs
    // if(!image || !title || !description || !price|| !oldprice|| !quantite || !promotion){
    //     res.status(400)
    //     throw new Error("Please add a text field")

    // }
// console.log(categorieId);

        const img = [];
        req.files.forEach((filePath) => {
        const path = filePath.path.split("\\")
        const imgPath = "/" + path[1] + "/" + path[2];
        img.push(imgPath);
        });
        console.log(img)
    
    try{
    // function create newproduit
        await ProduitSchema.create({
        image:img,
        title,
        description,
        price,
        oldprice,
        quantite,
        promotion,
        categorieId
    })
    
    res.status(200).send('Add produit success')
    }catch(error){
        res.status(400)
        throw new Error(error)
    }
})

// method : put
// url : /api/produit
// access : public
// update produit
const updateProduit = asyncHandler(async (req, res) => {
    const {title, description, price, oldprice, quantite, promotion } = req.body
    const id =  req.params.id;

    try {
        // functin update produit
        const updateproduit = await ProduitSchema.findOne({where:{id:id}})

        if(updateProduit){
            updateproduit.title = title
            updateproduit.description = description
            updateproduit.price = price
            updateproduit.oldprice = oldprice
            updateproduit.quantite = quantite
            updateproduit.promotion = promotion
            updateproduit.save()
            
            res.status(200).send('update produit success')
        }
    } catch (error) {
            res.status(400)
            throw new Error(error)
        }
})


// method : delete
// url : /api/produit
// access : public
// delete produit
const deleteProduit = asyncHandler(async (req, res) => {
    const id = req.params.id

    try{
        const deleteProduit = await ProduitSchema.destroy({where:{id}})
        res.status(200).send({message:"delete produit success"})
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
})


// method : get
// url : /api/produit
// access : public
// get one produit
const getOneProduit = asyncHandler(async (req, res) => {
    const id = req.params.id

    try{
        const OneProduit = await ProduitSchema.findOne({where:{id}})
        res.status(200).send({OneProduit})
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
})


// method : get
// url : /api/produit
// access : public
// get all produit
const getAllProduit = asyncHandler(async (req, res) => {

    try{
        const AllProduit = await ProduitSchema.findAll()
        res
        .status(200).send({AllProduit})
        .console.log({AllProduit})
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
})

module.exports  = {addProduit,updateProduit,deleteProduit,getOneProduit,getAllProduit}