import bcrypt from "bcryptjs";
import categorySchema from '../model/categoryModel.js'
import Category from "../model/categoryModel.js";


const categoryInfo = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 8;
        const skip = (page - 1) * limit;

        const categoryData = await Category.find({}).sort({createdAt : -1}).skip(skip).limit(limit)

        const totalcategories = await Category.countDocuments();
        const totalPages = Math.ceil(totalcategories/ limit);

        res.render("admin/categories", {title : 'categories', errorMessage: "" , cat : categoryData, currentPage : page, 
            totalPages : totalPages, totalcategories : totalcategories})

    } catch (error) {
        console.error(error)
    }
}


const addCategory = async (req,res) => {
    let {addCategoryName, addCategoryDescription, addThumbnail, addDiscountPrice, addVisibilityStatus} = req.body;
    try {
        const existingCategory = await Category.findOne({addCategoryName});
        if(existingCategory) {
            return res.status(400).json({error : "Category already exists"})
        }

        if(addVisibilityStatus == "Active"){
            addVisibilityStatus = true
        }else{
            addVisibilityStatus = false
        }

        const newCategory = new Category({
            name : addCategoryName,
            description : addCategoryDescription,
            thumbnail : addThumbnail,
            categoryOffer : addDiscountPrice,
            isListed : addVisibilityStatus
        })

        await newCategory.save();
        return res.json({message : "Category added successfully"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Internal server error"})
    }
}

const editCategory = async (req,res) => {
    try {
        const { editCategoryName, editCategoryDescription, discountPrice, editVisibilityStatus } = req.body;

        const category = await Category.findOne({ name: editCategoryName });

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        
        category.description = editCategoryDescription || category.description;
        category.categoryOffer = discountPrice || category.categoryOffer;
        category.isListed = editVisibilityStatus === "Active";
        console.log(editCategoryDescription)

        await category.save();
        return res.redirect("/admin/categories"); // Redirect back to categories page

    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}



export default {categoryInfo, addCategory, editCategory}