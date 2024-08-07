export const calcFileSize = (size: number) => {
  var fsExt = new Array('Byte', 'KB', 'MB', 'GB');
  let i = 0;
  while (size > 900) {
    size /= 1024; //divide file size
    i++;
  }
  //get exact size
  var exactSize = Math.round(size * 100) / 100 + '' + fsExt[i];
  return exactSize;
};
