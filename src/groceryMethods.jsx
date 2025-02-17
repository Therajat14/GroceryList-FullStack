export const addItem = async (item, groceries, setGroceries, apiRequest, API_URL, setFetchErr) => {
    const id = groceries.length
        ? Math.max(...groceries.map(grocery => grocery.id)) + 1
        : 1;

    const newGrocery = {
        id: id,
        des: item,
        isBought: false
    };

    await setGroceries([...groceries, newGrocery]);

    const postOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGrocery)
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchErr(result);
    console.log("ADDED to DB");
};

export const handleCheck = async (id, groceries, setGroceries, apiRequest, API_URL, setFetchErr) => {
    console.log('handleCheck', id);

    const updatedGroceries = groceries.map((grocery) =>
        grocery.id === id ? { ...grocery, isBought: !grocery.isBought } : grocery
    );

    setGroceries(updatedGroceries);

    const item = updatedGroceries.find(item => item.id === id);
    if (!item) {
        console.error("Item not found");
        return;
    }

    const updateOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBought: item.isBought })
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);

    if (result) {
        setFetchErr(result);
        console.error("API update failed:", result);
        setGroceries(groceries);
    }

    console.log("Checked");
};

export const binHandler = async (id, groceries, setGroceries, apiRequest, API_URL, setFetchErr) => {
    try {
        const list = groceries.filter((grocery) => grocery.id !== id);
        setGroceries(list);

        const deleteOptions = { method: 'DELETE' };
        const reqUrl = `${API_URL}/${id}`;
        const result = await apiRequest(reqUrl, deleteOptions);

        if (result) {
            throw new Error(result);
        }
    } catch (error) {
        setFetchErr(error.message);
        console.error("Delete failed:", error.message);
    }
};
