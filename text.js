const optionsPrompt = `What would you like to do?
(c) Create a list
(r) Read existing lists
(d) Delete a list
(v) View a lists items
(a) Add to do item
(m) Mark item as done
(x) Delete todo item
(q) Quit

`;

const nameForList = `Enter a name for your new list

`;

const invalidOption = `That was an invalid option, please try again...

`;

const deleteListPrompt = `Enter the id of the list you want to delete

`;

const viewListItems = `Enter the id of the list you want to view

`;

const addItemPrompt = `Enter list id for the new item

`;

const addItemNamePrompt = `Enter the name for your todo item

`;

const markItemListPrompt = `Which list id?

`;

const markItemPrompt = `Enter the item id to mark as done

`;

const deleteItemListPrompt = `Which list do you want to delete from?

`;

const deleteItemIdPrompt = `Enter the item id to delete from the list

`;

export {
  optionsPrompt,
  nameForList,
  invalidOption,
  deleteListPrompt,
  viewListItems,
  addItemPrompt,
  addItemNamePrompt,
  markItemListPrompt,
  markItemPrompt,
  deleteItemListPrompt,
  deleteItemIdPrompt,
};
