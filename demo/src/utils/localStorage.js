function getLocalData({ storageKey, dataKey }) {
  let storageData = JSON.parse(localStorage.getItem(storageKey));

  return storageData?.[dataKey];
}

function setLocalData({ storageKey, dataKey, dataBody }) {
  let storageData = localStorage.getItem(storageKey);

  if (storageData) {
    storageData = JSON.parse(storageData);
  } else {
    storageData = {};
  }

  storageData[dataKey] = dataBody;

  return localStorage.setItem(storageKey, JSON.stringify(storageData));
}

export { getLocalData, setLocalData };