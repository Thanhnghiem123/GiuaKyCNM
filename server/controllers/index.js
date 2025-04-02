const PaperModel = require("../models/index");
const { uploadFile } = require("../services/file.service");

const Controller = {};

Controller.get = async (req, res) => {
    try {
        const papers = await PaperModel.getPaper();
        return res.render("index", {papers});
    } catch(error) {
        console.log(error);
        res.status(500).send("Error");
    }
};

Controller.post  = async (req, res) => {
    const {tenbaibao, tennhomtacgia, chisoISBN, sotrang, namsanxuat} = req.body;
    const image = req.file;
    console.log(image);
    try {
        const imageUrl = await uploadFile(image);
        const papers = await PaperModel.createPaper({
            tenbaibao,
            tennhomtacgia,
            chisoISBN,
            sotrang,
            namsanxuat,
            image: imageUrl,
        });

        console.log("Paper created", papers);
        res.redirect("/papers");
    }catch(error) {
        console.log(error);
        res.status(500).send("Error");
    }
};

Controller.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await PaperModel.deletePaper(id);
        return res.redirect("/papers");
    } catch (error) {
        console.error(error);
        console.error("PaperModel error message:", error.message); // Log the error message
        return res.status(500).json({ message: "Failed to delete paper" });
    }
};

module.exports = Controller;