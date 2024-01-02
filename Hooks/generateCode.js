import {
    fetchDoc
} from './fetchDoc'

function generateRandomFourLetterWord() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for ( let i = 0; i < 4; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

export async function generateCode () {
    try {
        let exists = true
        let newCode = ''
        while (exists) {
            newCode = generateRandomFourLetterWord()
            const checkExists = await fetchDoc('sessions', newCode)
            if (!checkExists) exists = false
        }
        return newCode
    }
    catch (e) {
        console.log(e)
        return false
    }
}