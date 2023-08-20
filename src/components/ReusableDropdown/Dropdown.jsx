import { useEffect, useRef, useState } from "react";
import './dropdown.scss';


// let categories = [
//   "Mobile Devices",
//   "Laptops and Computers",
//   "Clothes & Shoes",
//   "Electronics",
//   "Commercial Equipment",
//   "Health",
//   // "Beauty and Accessories",
  
 
// ]

function Dropdown({selectedCategory, setSelectedCategory, categoryList, placeHolder }) {
  const [dropdownSearchValue, setDropdownSearchValue] = useState("")
  const [editMode, setEditMode] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [editMode])

  const categorySelectionHandler = category => {
    setSelectedCategory(category)
    setDropdownSearchValue("")
    setEditMode(false)
  }

//   const filteredCategories = colourList.filter(category =>
//     category.match(new RegExp(dropdownSearchValue, "i"))
//   )

  return (
    <drop  className='drop-container'>
      {editMode ? (
        // display the dropdown when the input us focused
     
        <div ref={dropdownRef}>
          
          <input
            className="dropdown-input response"
            name="dropdown-input"
            autoFocus
            onChange={e => setDropdownSearchValue(e.target.value)}
            value={dropdownSearchValue}
          />
          <div className="dropdown-list">
            <ul>
              {categoryList.map(category => {
                return (
                  <li key={category} onClick={() => categorySelectionHandler(category)}>
                    {category}{" "}
                  </li>
                )
              })}
              {categoryList.length === 0 && (
                <li className="no-result">No results found</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <input
          // Grey out the text when "Select Primary category" input hint is shown
          className={`dropdown-search response ${
            !(dropdownSearchValue || selectedCategory) && "default"
          }`}
          onFocus={() => setEditMode(true)}
          onBlur={() => setEditMode(false)}
          // Display the selected category or "Select Primary category" input hint
          value={selectedCategory || placeHolder}
          onChange={setSelectedCategory}
        />
      )}
    </drop>
  )
}

export default Dropdown
