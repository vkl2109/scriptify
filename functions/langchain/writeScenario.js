

exports.writeScenario = ({
    category, 
    characters
}) => {
    return `Generate at least 300 words of an insane, 
    crazy, elaborate scene introduction with three clues to a 
    murder mystery scenario based on the hit TV show 
    ${category} featuring the characters ${characters} with a minor character being the 
    victim. Do not reveal who might be one of the murderers.
    Next, for each of the characters ${characters} use your knowledge of their personality traits and most famous lines from 
    the show to create an object of quotes remarking on the scenario 
    where each character name is the key and each quote generated is the corresponding value. 
    Finally, generate an array of strings of the three clues each being only one or two words 
    used in generating the scenario.
    `
}

exports.writeNextScenario = ({
    category, 
    characters,
    choice
}) => {
    return `Generate at least 300 words of an insane, 
    crazy, elaborate scene starting with ${choice} and providing three new clues to a 
    murder mystery scenario based on the hit TV show 
    ${category} featuring the characters ${characters} with a minor character being the 
    victim. Do not reveal who might be one of the murderers.
    Next, for each of the characters ${characters} use your knowledge of their personality traits and most famous lines from 
    the show to create an object of quotes remarking on the scenario 
    where each character name is the key and each quote generated is the corresponding value. 
    Finally, generate an array of strings of the three clues each being only one or two words 
    used in generating the scenario.
    `
}