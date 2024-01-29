const colorPalette = {
    navy: '#161A30',
    darkPurple: '#31304D',
    grey: '#B6BBC4',
    winter: '#F0ECE5'
}

const generateScenario = `Generate 250 words of an insane, 
crazy, elaborate scene introduction with three clues to a 
wacky zany murder mystery scenario for the cast of the hit TV show 
Friends with one of the side characters being the 
victim and one of the main cast being one of the 
suspected murderers without revealing who yet. 
Next, generate an object of quotes for each of main characters 
based on their personality traits remarking on the scenario 
where each main character name is the key and each quote generated is the corresponding value. 
Finally, generate an array of strings of the three clues each being only one or two words 
used in generating the scenario.
`

const categories = [
    {
        image: 'friends',
        count: '4-6',
        title: 'Friends',
        players: [
            'Chander',
            'Rachel',
            'Monica',
            'Ross',
            'Phoebe',
            'Joey'
        ]
    },
    {
        image: 'gossip',
        count: '4-6',
        title: 'Gossip Girl',
        players: [
            'Nate',
            'Serena',
            'Chuck',
            'Blair',
            'Dan',
            'Jenny',
        ]
    },
    {
        image: 'suits',
        count: '2-4',
        title: 'Suits',
        players: [
            'Louis',
            'Donna',
            'Harvey',
            'Mike',
            'Rachel',
            'Jessica',
        ]
    },
]

const friendCategory = [
    {
        deviceID: '',
        name: 'Trevy',
        choice: 'Joey',
    },
    {
        deviceID: '',
        name: 'Alexia',
        choice: 'Monica',
    },
    {
        deviceID: '',
        name: 'Vinni',
        choice: 'Chandler',
    },
    {
        deviceID: '',
        name: '',
        choice: 'Phoebe',
    },
    {
        deviceID: '',
        name: '',
        choice: 'Rachel',
    },
    {
        deviceID: '',
        name: '',
        choice: 'Ross',
    },
]

const roundsData = [
    {
        index: 0,
        label: 3,
    },
    {
        index: 1,
        label: 5,
    }, 
    {
        index: 2,
        label: 7,
    },
    {
        index: 3,
        label: 9,
    }
]

export {
    categories,
    friendCategory,
    roundsData,
    generateScenario
}