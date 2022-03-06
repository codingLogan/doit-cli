import {
  CreateListInteractor,
  GetListsInteractor,
  DeleteListInteractor,
  AddItemInteractor,
  CompleteItemInteractor,
  DeleteItemInteractor,
  TestRepository,
} from "doit";

// Boostrap all the interactors
// Notice - Each of these could technically be a different database :)
const repo = new TestRepository();
const listCreator = new CreateListInteractor(repo);
const listGetter = new GetListsInteractor(repo);
const listDeletor = new DeleteListInteractor(repo);
const itemAdder = new AddItemInteractor(repo);
const itemCompletor = new CompleteItemInteractor(repo);
const itemDeletor = new DeleteItemInteractor(repo);

function createList(listName) {
  const result = listCreator.createList({ name: listName });
  console.log("createList: ", result);
  return result;
}

function getLists() {
  const lists = listGetter.getLists();
  console.log("getLists: ", lists);
  return lists;
}

function deleteList(listId) {
  const result = listDeletor.delete(listId);
  console.log("deleteList: ", result ? "deleted" : "not deleted");
  return result;
}

function addItem(listID, newItemName) {
  const result = itemAdder.addItem({
    listID,
    newItemName,
  });
  console.log("addItem: ", result);
  return result;
}

function completeItem(listId, itemId) {
  const result = itemCompletor.execute({ listId, itemId });
  console.log("completeItem: ", result);
  return result;
}

function deleteItem(listId, itemId) {
  const result = itemDeletor.deleteItemFromList(listId, itemId);
  console.log("deleteItem: ", result);
  return result;
}

// Run the program
const newList = createList("My First List");
addItem(newList.id, "Build a CLI"); // Might be better to return the item, rather than the list
addItem(newList.id, "Ask for input from CLI");
getLists();
completeItem(newList.id, "1"); // Returns the item
deleteItem(newList.id, "1");
deleteList(newList.id);

// End result of lists
getLists();

process.exit();
