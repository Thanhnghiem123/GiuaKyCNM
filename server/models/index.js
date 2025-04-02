const {dynamodb} = require("../utils/aws-helper");

const {v4: uuidv4} = require("uuid");

const tableName = "Paper1";

const PaperModel = {
    createPaper : async data => {
        const id = uuidv4();
        const params = {
            TableName : tableName,
            Item : {
                id,
                tenbaibao : data.tenbaibao,
                tennhomtacgia : data.tennhomtacgia,
                chisoISBN : data.chisoISBN,
                sotrang : data.sotrang,
                namsanxuat : data.namsanxuat,
                image : data.image
            },
        };
        try {
            await dynamodb.put(params).promise();
            return {id : id , ...data};
        }catch (error) {
            console.error("Error creating subject: " , error);
            throw error;
        }
    },

    getPaper : async  () => {
        const params = {
            TableName : tableName
        };
        try{
            const papers = await dynamodb.scan(params).promise();
            return papers.Items;
        }  catch (error) {
            console.error("Error creating subject: " , error);
            throw error;
        }
    },

    deletePaper : async (paperid) => {
        const params = {
            TableName : tableName,
            Key: {
                id: paperid,
            },
        };

        try {
            await dynamodb.delete(params).promise();
            return {id : paperid};
        }catch(error) {
            console.error("Error", error);
            throw error;
        }

    },

    
}

module.exports = PaperModel;