import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';
import { useState, useEffect } from 'react';
import AddItem from './additem.jsx';
import SearchBar from './searchBar.jsx';



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

  const addItem = (item) => {

    const id = groceries.length
      ? Math.max(...groceries.map(grocery => grocery.id)) + 1
      : 1;

    console.log(id)
    const newGrocery = {
      id: id,
      des: newItem,
      isBought: false
    }

    setGroceries([...groceries, newGrocery])


  }

  const handleCheck = (id) => {
    console.log('handleCheck', id);
    const grocerylist = groceries.map((grocery) => {
      if (grocery.id === id) {
        return { ...grocery, isBought: !grocery.isBought };
      }
      return grocery;
    });

    setGroceries(grocerylist)
  }

  const binHandler = (id) => {
    const list = groceries.filter((grocery) => grocery.id !== id);
    setGroceries(list);
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
