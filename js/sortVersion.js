const version = ['0.1.1', '0.224.5', '0.3.0', '3.1', '4.3.8', '4.3.9', '4.3.7.9']

const sortedVersions = sortVersions(version)
function sortVersions(versions) {
    return versions.sort((a, b) => {
        const arr1 = a.split('.').map(Number)
        const arr2 = b.split('.').map(Number)
        console.log(arr1);
        const maxLength = Math.max(arr1.length, arr2.length)
        for (let i = 0; i < maxLength; i++) {
            const num1 = arr1[i] || 0
            const num2 = arr2[i] || 0
            if (num1 !== num2) {
                return num1 - num2
            }
        }
    })
}
console.log(sortedVersions);