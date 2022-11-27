const [localData, setLocalData] = useState({});

useEffect(() => {
  (async () => {
    const savedData = (await AsyncStorage.getItem("userInfo")) || {};
    if (Object.keys(savedData).length > 0) {
      setLocalData(savedData);
    }
  })();
}, [localData]);

console.log(userInfo);
console.log("This is the saved data: ..");
//   console.log(savedData);
console.log("This is the local data:");
console.log(localData);
//   console.log(userToken);

setLocalData((prev) => ({
  prev,
  avatar: response.data.avatar,
}));
