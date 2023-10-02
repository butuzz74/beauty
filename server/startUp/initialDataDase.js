const massages = require("../mock/massages.json");
const Massage = require("../models/Massage")


module.exports = async () => {
    const massagesList = await Massage.find();
    if (massagesList.length !== Massage.length) {
        await createInitialEntity(Massage, massages);
    }    
};

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (elem) => {
            try {
                delete elem.id;
                const newElem = new Model(elem);
                await newElem.save();
                return newElem;
            } catch (error) {
                return error;
            }
        })
    );
}