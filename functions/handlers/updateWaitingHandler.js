const { 
    db,
    logger,
    HttpsError
 } = require('../config.js')
const { generateScenario } = require("../langchain/generateScenario.js")
const { generateQuote } = require("../langchain/generateQuote.js")

exports.updateWaitingHandler = async ({
    request: request,
    secret: secret,
}) => {
    try {
        const { totalPlayers, rounds, code, category } = request.data
        
        for (let i = 1; i <= rounds; i++) {
            let newScenario = ''
            let quotes = {}
            if (i == 1) {
                const generateScenarioResult = await generateScenario({
                    category: category,
                    secret: secret,
                })
                if (!generateScenarioResult?.success) throw new Error('failed to generate scenario')
                newScenario = generateScenarioResult?.scenario
                for (let player of totalPlayers) {
                    const generateQuoteResult = await generateQuote({
                        character: player?.choice,
                        scenario: newScenario,
                        secret: secret,
                    })
                    if (!generateQuoteResult?.success) throw new Error('failed to generate quote')
                    quotes[player?.choice] = generateQuoteResult?.quote
                }
            }
            await db.collection('sessions').doc(code).collection('rounds').doc(`round${i}`).set({
                ratings: [],
                scenario: newScenario,
                quotes: quotes,
            })
        }

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

        return { success: true }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("internal", "failure to update game")
    }
}