const { 
    db,
    logger,
    HttpsError
 } = require('../config.js')
const { generateScenario } = require("../langchain/generateScenario.js")
const { writeNextScenario } = require("../langchain/writeScenario.js")

exports.updateNextRoundHandler = async ({
    request: request,
    secret: secret,
}) => {
    try {
        const { currentRound, code, category, characters, choice } = request.data
        
        let newScenario = ''
        let newQuotes = {}
        let generatedOptions = []
        let newOptions = {}
        const scenario = writeNextScenario({
            category,
            characters,
            choice,
        })
        const updateScenarioResult = await generateScenario({
            scenario: scenario,
            secret: secret,
        })
        if (!updateScenarioResult?.success) throw new Error('failed to generate scenario')
        newScenario = updateScenarioResult?.result?.scenario || ''
        newQuotes = updateScenarioResult?.result?.quotes || {}
        generatedOptions = updateScenarioResult?.result?.options || []
        generatedOptions.map((newOption) => {
            newOptions[newOption] = []
        })
        await db.collection('sessions').doc(code).collection('rounds').doc(`round${currentRound + 1}`).update({
            scenario: newScenario,
            quotes: newQuotes,
            options: newOptions,
        })

        return { success: true }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("internal", "failure to update game")
    }
}