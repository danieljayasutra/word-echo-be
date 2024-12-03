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

module.exports = {
  getRandomData,
};
