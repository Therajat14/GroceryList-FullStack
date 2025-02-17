import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';
import { useState, useEffect } from 'react';
import AddItem from './additem.jsx';
import SearchBar from './searchBar.jsx';
import apiRequest from './apiRequest.jsx';


function Main() {
  // console.log('Main component');

  const API_URL = "http://localhost:3500/items";

  const [groceries, setGroceries] = useState([]);
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState('');
  const [fetchErr, setFetchErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not recived expected data")
        const items = await response.json();
        console.log(items)
        setGroceries(items);
        setFetchErr(null);
      }
      catch (err) {
        console.error(err.message);
        setFetchErr(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      fetchItems();

    }, 500);

  }, []);

  const addItem = async (item) => {

    const id = groceries.length
      ? Math.max(...groceries.map(grocery => grocery.id)) + 1
      : 1;
    const newGrocery = {
      id: id,
      des: newItem,
      isBought: false
    }
    setGroceries([...groceries, newGrocery]);

    // ADDING ITEM TO THE JSON-SERVER

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(newGrocery)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchErr(result);
    console.log("ADDED to DB")

  }


  //   HANDELS THE CHECK OPRATION ON A LIST



  const handleCheck = async (id) => {
    console.log('handleCheck', id);

    // Update local state first for a better user experience
    const updatedGroceries = groceries.map((grocery) =>
      grocery.id === id ? { ...grocery, isBought: !grocery.isBought } : grocery
    );

    setGroceries(updatedGroceries); // ✅ Optimistically update UI

    // Find the updated item
    const item = updatedGroceries.find(item => item.id === id);
    if (!item) {
      console.error("Item not found");
      return;
    }

    // API request options
    const updateOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isBought: item.isBought })
    };

    // Make the API request
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);

    if (result) {
      setFetchErr(result);
      console.error("API update failed:", result);
    }

    console.log("Checked");
  };



  // HANDELS THE DELETE BUTTON

  const binHandler = async (id) => {
    const list = groceries.filter((grocery) => grocery.id !== id);
    setGroceries(list);
    const deleteOptions = {
      method: 'DELETE'
    };

    const reqUrl = `${API_URL}/${id}`; // ✅ Use correct API URL

    const result = await apiRequest(reqUrl, deleteOptions); // ✅ Await the API request

    if (result) {
      setFetchErr(result);
      console.error("Delete failed:", result);
    }

  }

  const handelSubmit = (e) => {
    e.preventDefault()
    if (AddItem === '') return;
    console.log("Submitted")
    setNewItem('');
    addItem("hii");
  }

  return (
    <div className='mainContent'>
      <Header heading="Grocery list" />
      <AddItem newItem={newItem} setNewItem={setNewItem} handelSubmit={handelSubmit} />
      <SearchBar search={search} setSearch={setSearch} />


      <main>
        {
          fetchErr && <p style={{
            color: "#ff6b6b",
            display: "flex",
            alignContent: "center",
            justifyContent: "center"


          }}>{`Error : ${fetchErr}`}</p>
        }
        {
          isLoading && <p style={{
            color: "#4caf50",
            display: "flex",
            alignContent: "center",
            justifyContent: "center"


          }}>Lading Data...</p>
        }

        {!fetchErr && !isLoading && <App
          groceries={groceries.filter(grocery => grocery.des.toLowerCase().includes(search.toLowerCase()))}
          setGroceries={setGroceries}
          handleCheck={handleCheck}
          binHandler={binHandler} />}
      </main>



      <Footer length={groceries.length} />

    </div>
  );
}

createRoot(document.getElementById('root')).render(


  <Main />

);
