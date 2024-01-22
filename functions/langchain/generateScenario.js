const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts")
const { RunnableSequence } = require("@langchain/core/runnables")
const { StringOutputParser } = require("@langchain/core/output_parsers")
const { 
    logger,
    HttpsError
 } = require('../config.js')

exports.generateScenario = async ({ 
    category, 
    secret 
}) => {
    try {
        const model = new ChatOpenAI({
            openAIApiKey: secret,
            temperature: 1,
        });
        const promptTemplate = PromptTemplate.fromTemplate(
        "Generate an elaborate scene introduction to a wacky zany murder mystery scenario for the cast of the hit TV show {show} with another {show} side character being the victim and one of the main cast being one of the suspected murderers without revealing who yet. Limit to two paragraphs and end every sentence with a period."
        );
        const outputParser = new StringOutputParser();

        const chain = RunnableSequence.from([promptTemplate, model, outputParser]);

        const result = await chain.invoke({ show: category });

        return { success: true, scenario: result }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("internal", "failure to generate scenario")
    }
}