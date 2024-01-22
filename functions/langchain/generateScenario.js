const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts")
const { RunnableSequence } = require("@langchain/core/runnables")
const { StringOutputParser } = require("@langchain/core/output_parsers")
const { 
    logger,
    HttpsError
 } = require('../config.js')

exports.generateScenario = async ({ 
    request, 
    secret 
}) => {
    try {
        const model = new ChatOpenAI({
            openAIApiKey: secret,
        });
        const promptTemplate = PromptTemplate.fromTemplate(
        "Tell me a joke about {topic}"
        );
        const outputParser = new StringOutputParser();

        const chain = RunnableSequence.from([promptTemplate, model, outputParser]);

        const result = await chain.invoke({ topic: "bears" });

        return { success: true, scenario: result }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("internal", "failure to generate scenario")
    }
}