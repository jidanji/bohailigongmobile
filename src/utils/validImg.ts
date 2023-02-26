const validImg = (source: string): boolean => {
    try {
        if (source) {
            const extArray = ['bmp', 'jpg', 'png', 'jpeg'];
            const index = source.lastIndexOf(".");
            const ext = source.substr(index + 1).toLowerCase();
            return extArray.includes(ext);
        }
        return false
    }
    catch (err) {
        console.log(err)
        return false
    }
}
export default validImg;
