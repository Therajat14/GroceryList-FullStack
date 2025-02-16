const apiRequest = async (url = '', optioinsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optioinsObj);
        if (!response.ok) throw new Error("Unexpected Error Occurred RELOAD PAGE");
    }
    catch (err) {
        errMsg = err.message;
    }
    finally {
        return errMsg;
    }

}

export default apiRequest;