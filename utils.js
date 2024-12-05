function getRandomData(data, excludedIds) {
  // Filter data to remove elements with IDs that are in excludedIds
  const filteredData = data.filter((item) => !excludedIds.includes(item.id));

  // If no data remains after the filter, return null.
  if (filteredData.length === 0) {
    return null;
  }

  // Randomly select elements from filtered data
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
}

/**
* Compare to string to get the similarity
* @param reference The correctstring should be
* @param actual User input
*
* @return a similarity percentage from scale 0 to 1
*/
function levenstheinDistance(reference, actual) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Initialize the base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // Characters match
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j],    // Deletion
                    dp[i][j - 1],    // Insertion
                    dp[i - 1][j - 1] // Substitution
                ) + 1;
            }
        }
    }

    const distance = dp[m][n];
    const maxLength = Math.max(a.length, b.length);
  
    if (maxLength === 0) {
      return 1; // Both strings are empty
    }
  
    return (1 - distance / maxLength).toFixed(2);
}

module.exports = {
  getRandomData,
};


