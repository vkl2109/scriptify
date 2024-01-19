const { 
    db,
    logger,
    HttpsError
 } = require('../config.js')

exports.createGameHandler = async (request) => {
    try {
        const category = request.data.category
        const code = request.data.code
        const deviceID = request.data.deviceID
        let newPlayers = []
        category.players.map((player) => {
            newPlayers.push({
                name: '',
                deviceID: '',
                choice: player
            })
        })
        await db.collection("sessions").doc(code).set({
            category: category.title,
            host: deviceID,
            players: newPlayers
        })
        return { success: true }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("failure to create new game")
    }
}