const reverseArray = (arr, left = 0, right = arr.length - 1) => {
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]

        left++
        right--
    }

    return arr
}

const rotateArrayByK = (arr, k) => {
    const n = arr.length
    k = k % n

    // Step 1 - Reverse the whole array
    reverseArray(arr)

    // Reverse the first k elements
    reverseArray(arr, 0, k-1)

    // Reverse the remaining elements
    reverseArray(arr, k, n-1)

    return arr

    
    // This approch takes o(n) space
    // const revercedArr = reverseArray(arr)

    // const firstSection = revercedArr.slice(0, k)
    // const secondSection = revercedArr.slice(k)

    // const firstSectionRev = reverseArray(firstSection)
    // const secondSectionRev = reverseArray(secondSection)

    // return [...firstSectionRev, ...secondSectionRev]
}

const arr = [1,2,3,4,5,6]

console.log(rotateArrayByK(arr, 2))