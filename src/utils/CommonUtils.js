

class CommonUtils {

    /**
     * convert base64 to URL to display the image
     * @param bufferBase64
     * @return url string
     */
    static getUrlFromBase64(base64) {
        return new Buffer.from(base64, 'base64').toString('binary');
    }

}


export default CommonUtils;