const rotateArray = (arr, k) => {
    const length = arr.length
    const requiredRotations = k % length
    const tempArr = arr.slice(length - requiredRotations)

    // Shift elements to the right by k steps
    for (let i = length - requiredRotations - 1; i >= 0; i--) {
        arr[i+requiredRotations] = arr[i]
    }

    // Put the elements of temp arr in the start
    for (let i = 0; i < requiredRotations; i++) {
        arr[i] = tempArr[i]
    }

    return arr
}


const arr = [1,2,3,4,5]
const k = 6

console.log(rotateArray(arr, k))