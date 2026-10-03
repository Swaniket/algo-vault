const simpleMatchWildCard = (text, pattern) => {
    const wildCardIndex = pattern.indexOf("*");
    
    // If * doesn't exists, return true if pattern is exact match to the text
    if(wildCardIndex === -1) {
        return text === pattern
    }

    const prefixText = pattern.slice(0, wildCardIndex)
    const suffixText = pattern.slice(wildCardIndex+1)

    const startMatch = text.startsWith(prefixText)
    const endMatch = text.endsWith(suffixText)
    const textLength = text.length >= prefixText.length + suffixText.length

    return startMatch && endMatch && textLength
}


const pattern = "foo*bar"
const tc = ["foo123bar", "foobar", "fooXYZbar", "foobaz"];

tc.forEach((s) => {
    console.log(simpleMatchWildCard(s, pattern))
})



