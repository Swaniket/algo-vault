const minOf = (a, b) => {
    if (a < b) return a
    return b
}

const getArea = (arr) => {
    let maxArea = 0

    for (let i = 0; i <= arr.length; i++) {
        for (let j = i + 1; j <= arr.length; j++) {
            const area = minOf(arr[i], arr[j]) * (j - 1)
            if (area > maxArea) maxArea = area
        }
    }

    return maxArea
}

const arr = [3, 7, 5, 6, 8, 4]

console.log(getArea(arr))