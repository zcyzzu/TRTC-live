export function dataURLtoBlob(dataurl) {
    //将base64转换为blob
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

export function blobToFile(theBlob, fileName = "default") {
    //将blob转换为file
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}