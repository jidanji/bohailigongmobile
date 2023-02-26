export object2Arr=(obj,key="kay",value="value")=> {
  const kyes = Object.keys(obj);
  let arr = [];
  kyes.forEach((item, index) => {
    const item = { [key]: item, [value]: obj[key] }
    arr.push(item)
  })
  return arr;
}


