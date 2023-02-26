export const getFileURL = (file: any) => {
  let getUrl = null;
  if (window.createObjectURL !== undefined) { // basic
    getUrl = window.createObjectURL(file);
  } else if (window.URL !== undefined) { // mozilla(firefox)
    getUrl = window.URL.createObjectURL(file);
  } else if (window.webkitURL !== undefined) { // webkit or chrome
    getUrl = window.webkitURL.createObjectURL(file);
  }
  return getUrl;
};
 export const validImg = (source: string): boolean => {
  try {
    if (source) {
      const extArray = ['bmp', 'jpg', 'png', 'jpeg'];
      return extArray.includes(getFileExtension(source));
    }
    return false
  }
  catch (err) {
    console.log(err)
    return false
  }
}

export  const  getFileExtension=(source: string)=> {
  const index = source.lastIndexOf(".");
  const extension = source.substr(index + 1).toLowerCase();
  return extension;
}

