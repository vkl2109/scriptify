const { 
    db,
    logger,
    HttpsError
 } = require('../config.js')

exports.updateWaitingHandler = async (request) => {
    try {
        const { totalPlayers, rounds, code } = request.data
        const newPlayersArray = []
        totalPlayers.map((player) => {
            if (player?.deviceID != '') {
                newPlayersArray.push(player)
            }
        })
        const randomSuspect = Math.floor(Math.random() * newPlayersArray.length)
        const sessionRef = db.collection('sessions').doc(code)
        await sessionRef.update({
            players: newPlayersArray,
            suspect: randomSuspect,
            turns: {
                hasStarted: true,
                hasFinished: false,
                currentRound: 1,
                currentTurn: 0,
                totalRounds: rounds,
            }
        })
        for (let i = 1; i <= rounds; i++) {
            await db.collection('sessions').doc(code).collection('rounds').doc(`round${i}`).set({
                ratings: []
            })
        }
        return { success: true }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("internal", "failure to update game")
    }
}