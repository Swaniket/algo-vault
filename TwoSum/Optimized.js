const twoSum = (arr, k) => {
    let targetTracker = {}
    let pair

    for(let i = 0; i < arr.length; i++) {
        currElement = arr[i]
        const diff = k - currElement

        if (targetTracker[currElement] !== undefined) {
            const indexForPair = targetTracker[currElement]
            pair = [indexForPair, i]
        } else {
            targetTracker[diff] = i
        }
    }

    return pair
}

// const arr = [2,3,9,0,6]
const arr = [2,7,3,-1,4]
const k = 2

console.log(twoSum(arr, k))

// key = diff, value = index

// {
//     13: 0,
//     12: 1,
//     6: 2,
//     15: 3,
// }