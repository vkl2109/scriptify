const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts")
const { RunnableSequence } = require("@langchain/core/runnables")
const { StringOutputParser } = require("@langchain/core/output_parsers")
const { 
    logger,
    HttpsError
 } = require('../config.js')

exports.generateQuote = async ({ 
    character,
    scenario, 
    secret 
}) => {
    try {
        const model = new ChatOpenAI({
            openAIApiKey: secret,
            temperature: 1,
        });
        const promptTemplate = PromptTemplate.fromTemplate(
        "Based on this scenario, generate a wacky zany quote for the character {character}: {scenario}"
        );
        const outputParser = new StringOutputParser();

        const chain = RunnableSequence.from([promptTemplate, model, outputParser]);

        const result = await chain.invoke({ character: character, scenario: scenario });

        return { success: true, quote: result }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("internal", "failure to generate scenario")
    }
}