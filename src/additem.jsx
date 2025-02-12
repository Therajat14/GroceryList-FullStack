import { useRef } from "react";
import { useReducer } from "react";
import { FaPlus } from "react-icons/fa";


const AddItem = ({ newItem, setNewItem, handelSubmit }) => {
    const inputRef = useRef();
    return (
        <form
            className='addItem1'
            onSubmit={handelSubmit}
            required>

            <label htmlFor="addItem1" className="addItem">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    onClick={() => inputRef.current.focus()}
                ><FaPlus /></button>
            </label>
        </form>

    );
}

export default AddItem; 