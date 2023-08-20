import { useEffect, useRef, useState } from "react";
import CategoryIcon from '../../props/Icons/Category.svg';
import './seller.scss';

let categories = [
  "Food",
  "Drink",
  
  // "Beauty and Accessories",
  
 
]

function CategoryDrop({selectedCategory, setSelectedCategory }) {
  // const [selectedCategory, setSelectedCategory] = useState("")
  const [dropdownSearchValue, setDropdownSearchValue] = useState("")
  const [editMode, setEditMode] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
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

  const filteredCategories = categories.filter(category =>
    category.match(new RegExp(dropdownSearchValue, "i"))
  )

  return (
    <div  className='Seller__main__form__input category'>
       <div className='icon-div'>
       <div className='icon-overlay'></div>
        <img src={CategoryIcon} alt="" /></div> 
      {editMode ? (
        // display the dropdown when the input us focused
     
        <div ref={dropdownRef}>
          
          <input
            className="dropdown-input"
            name="dropdown-input"
            autoFocus
            onChange={e => setDropdownSearchValue(e.target.value)}
            value={dropdownSearchValue}
          />
          <div className="dropdown-list">
            <ul>
              {filteredCategories.map(category => {
                return (
                  <li key={category} onClick={() => categorySelectionHandler(category)}>
                    {category}{" "}
                  </li>
                )
              })}
              {filteredCategories.length === 0 && (
                <li className="no-result">No results found</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <input
          // Grey out the text when "Select Primary category" input hint is shown
          className={`dropdown-search ${
            !(dropdownSearchValue || selectedCategory) && "default"
          }`}
          onFocus={() => setEditMode(true)}
          onBlur={() => setEditMode(false)}
          // Display the selected category or "Select Primary category" input hint
          value={selectedCategory || "Select Category"}
          onChange={setSelectedCategory}
        />
      )}
    </div>
  )
}

export default CategoryDrop
