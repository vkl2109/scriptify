const colorPalette = {
    navy: '#161A30',
    darkPurple: '#31304D',
    grey: '#B6BBC4',
    winter: '#F0ECE5'
}

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
        label: 5,
    },
    {
        index: 1,
        label: 7,
    }, 
    {
        index: 2,
        label: 10,
    },
    {
        index: 3,
        label: '∞'
    }
]

export {
    categories,
    friendCategory,
    roundsData
}