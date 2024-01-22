/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onCall } = require("firebase-functions/v2/https");
const { createGameHandler } = require("./handlers/createGameHandler")
const { updateWaitingHandler } = require("./handlers/updateWaitingHandler")
const { generateScenario } = require("./langchain/generateScenario")
const { defineSecret } = require('firebase-functions/params');
const GPTAPIKey = defineSecret('Scriptify-GPT');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createNewGame = onCall(async (request) => {
    return createGameHandler(request)
})

exports.updateWaitingRoom = onCall(async (request) => {
    return updateWaitingHandler(request)
})

exports.testScriptGenerator = onCall(
    { secrets: [GPTAPIKey] },
    async (request) => {
    return generateScenario({
        request: request,
        secret: GPTAPIKey.value()
    })
})