'use strict';

// `STORE` holds all of the data used to render
const STORE = {
  items: [{name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}],
  hideCompleted: false,
};
// make a function that changes STORE hidecompleted to true
//this will add hidden attribute to checked items
//render the list
function handleCheckboxClicked () {
  $('#js-checkbox').click(event => {
    STORE.hideCompleted = !STORE.hideCompleted;
    if (STORE.items.checked === true) {
      // make true items hidden ?????
    } 
    console.log(STORE);
    console.log('handle checkbox clicked ran');
  });
  renderShoppingList();
}

// responsible for generating a string representing a
// single shopping list item.
function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}
// given the state of the shopping list, generate a single
// string representing the entire shopping list
function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');
  // generate an array of strings representing individual
  // shopping list items
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  // join together the item strings into a single big string
  return items.join('');
}

// render the shopping list in the DOM
function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  // generate the string to represent the shopping list
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

// name says it all -- given a name, add a new item 
// to the store
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

// when users submit a new item, push a new item onto the
// store and re-render the list in the DOM
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

// toggle the checked property for an item at a given
// index in the store
function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

// name says it all: retrieve the store item index from
// the data we save in the DOM object representing the item
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}


// when a user clicks the check button, toggle the 
// checked property of the item in the store and re-render
// the shopping list in the DOM
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

// name says it all. responsible for deleting a list item.
function deleteListItem(itemIndex) {
  console.log(`Deleting item at index  ${itemIndex} from shopping list`);

  // as with `addItemToShoppingLIst`, this function also has the side effect of
  // mutating the global STORE value.
  //
  // we call `.splice` at the index of the list item we want to remove, with a length
  // of 1. this has the effect of removing the desired item, and shifting all of the
  // elements to the right of `itemIndex` (if any) over one place to the left, so we
  // don't have an empty space in our list.
  STORE.items.splice(itemIndex, 1);
}

// when a user clicks the delete button on an item, get that
// item's index, delete it from store, and re-render the 
// shopping list in the DOM
function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in STORE
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCheckboxClicked ();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);