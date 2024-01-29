const { 
    db,
    logger,
    HttpsError
 } = require('../config.js')
const { generateScenario } = require("../langchain/generateScenario.js")
const { writeScenario } = require("../langchain/writeScenario.js")

exports.updateWaitingHandler = async ({
    request: request,
    secret: secret,
}) => {
    try {
        const { totalPlayers, rounds, code, category, characters } = request.data
        
        for (let i = 1; i <= rounds; i++) {
            let newScenario = ''
            let newQuotes = {}
            let generatedOptions = []
            let newOptions = {}
            if (i == 1) {
                const scenario = writeScenario({
                    category,
                    characters
                })
                const generateScenarioResult = await generateScenario({
                    scenario: scenario,
                    secret: secret,
                })
                if (!generateScenarioResult?.success) throw new Error('failed to generate scenario')
                newScenario = generateScenarioResult?.result?.scenario || ''
                newQuotes = generateScenarioResult?.result?.quotes || {}
                generatedOptions = generateScenarioResult?.result?.options || []
                generatedOptions.map((newOption) => {
                    newOptions[newOption] = []
                })
            }
            await db.collection('sessions').doc(code).collection('rounds').doc(`round${i}`).set({
                ratings: {},
                scenario: newScenario,
                quotes: newQuotes,
                options: newOptions,
            })
        }

        const newPlayersArray = []
        totalPlayers.map((player) => {
            if (player?.deviceID != '') {
                newPlayersArray.push(player)
            }
        })
        const randomSuspectIndex = Math.floor(Math.random() * newPlayersArray.length)
        const randomSuspect = newPlayersArray[randomSuspectIndex]?.choice
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