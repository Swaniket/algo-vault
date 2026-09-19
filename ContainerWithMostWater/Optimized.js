const minOf = (a, b) => {
    if (a < b) return a
    return b
}

const getArea = (arr, left, right) => {
    return minOf(arr[right], arr[left])*(right - left)
}

const getMaxArea = (arr) => {
    if (arr.length === 0) return 0

    let leftPointer = 0
    let rightPointer = arr.length - 1

    let maxWaterWidth = getArea(arr, leftPointer, rightPointer)

    while (leftPointer < rightPointer) {
        const calcWaterWidth = getArea(arr, leftPointer, rightPointer)

        if (calcWaterWidth > maxWaterWidth) maxWaterWidth = calcWaterWidth

        if (arr[leftPointer] < arr[rightPointer]) {
            leftPointer++
        } else {
            rightPointer--
        }
    }

    return maxWaterWidth
}

// const arr = [3,7,5,6,8,4]
// const arr = [1,5,6,3,4]
// const arr = [10,6,5,6,5,7]
// const arr = [10]
const arr = []

console.log(getMaxArea(arr))