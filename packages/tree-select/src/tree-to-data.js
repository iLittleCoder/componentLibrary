// 树形结构扁平化
export const treeToData = (data, type = 'children') => {
  let result = [];
  function getData(arr) {
    arr.forEach((item) => {
      result.push(item);
      if (item[type] && item[type].length > 0) {
        getData(item[type]);
      }
    });
  }
  if (data && data.length > 0) {
    getData(data);
  }
  return result;
};
