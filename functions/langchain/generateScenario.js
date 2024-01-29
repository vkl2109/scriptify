const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts")
const { RunnableSequence } = require("@langchain/core/runnables")
const { StructuredOutputParser } = require("langchain/output_parsers")
const { z } = require("zod")
const { 
    logger,
    HttpsError
 } = require('../config.js')

exports.generateScenario = async ({ 
    scenario, 
    secret 
}) => {
    try {
        const model = new ChatOpenAI({
            openAIApiKey: secret,
            temperature: 1,
        });
        const promptTemplate = PromptTemplate.fromTemplate(
        "Generate a scenario based on these instructions: {scenario} {format_instructions}"
        );

        const parser = StructuredOutputParser.fromZodSchema(
            z.object({
                scenario: z.string().describe("scenario from the user's prompt"),
                quotes: z
                .record(z.string())
                .describe("quotes from the main characters"),
                options: z
                .array(z.string())
                .describe("three clues from the scenario"),
            })
        );

        const chain = RunnableSequence.from([promptTemplate, model, parser]);

        const result = await chain.invoke({ 
            scenario: scenario,
            format_instructions: parser.getFormatInstructions()
        });

        return { success: true, result: result }
    }
    catch (e) {
        logger.log(e)
        throw new HttpsError("internal", "failure to generate scenario")
    }
}