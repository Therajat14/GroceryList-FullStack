const apiRequest = async (url = '', optioinsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optioinsObj);
        if (!response.ok) throw error("Unexpected Error Occured");
    }
    catch (err) {
        errMsg = err.message
    }
    finally {
        return errMsg;
    }

}

export default apiRequest;