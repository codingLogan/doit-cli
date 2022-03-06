import {
  CreateListInteractor,
  GetListsInteractor,
  DeleteListInteractor,
  AddItemInteractor,
  CompleteItemInteractor,
  DeleteItemInteractor,
  TestRepository,
} from "doit";

import { prompt } from "./prompt.js";
import { clearScreen } from "./ui.js";
import {
  addItemNamePrompt,
  addItemPrompt,
  deleteItemIdPrompt,
  deleteItemListPrompt,
  deleteListPrompt,
  invalidOption,
  markItemListPrompt,
  markItemPrompt,
  nameForList,
  optionsPrompt,
  viewListItems,
} from "./text.js";

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
  console.log("Creating new list:\n\n ", result, "\n");
  return result;
}

function getLists() {
  const lists = listGetter.getLists();
  console.log("Reading all lists:\n\n ", lists, "\n");
  return lists;
}

function deleteList(listId) {
  const result = listDeletor.delete(listId);
  console.log(
    `Deleting list with id of "${listId}":\n\n`,
    result ? "deleted" : "not deleted",
    "\n"
  );
  return result;
}

function addItem(listID, newItemName) {
  const result = itemAdder.addItem({
    listID,
    newItemName,
  });
  console.log(
    `Adding "${newItemName}" to list with id "${listID}":\n\n`,
    result,
    "\n"
  );
  return result;
}

function completeItem(listId, itemId) {
  const result = itemCompletor.execute({ listId, itemId });
  console.log(`Marking item with id "${itemId}" as done:\n\n`, result, "\n");
  return result;
}

function deleteItem(listId, itemId) {
  const result = itemDeletor.deleteItemFromList(listId, itemId);
  console.log(`Deleting item with id "${itemId}":\n\n`, result, "\n");
  return result;
}

// Run the program
clearScreen();

function appLoop() {
  prompt.question(optionsPrompt, (answer) => {
    clearScreen();

    switch (answer) {
      case "c":
        prompt.question(nameForList, (nameAnswer) => {
          createList(nameAnswer);
          appLoop();
        });
        break;

      case "r":
        getLists();
        appLoop();
        break;

      case "d":
        prompt.question(deleteListPrompt, (deleteListAnswer) => {
          deleteList(deleteListAnswer);
          appLoop();
        });
        break;

      case "v":
        const lists = getLists().lists;
        prompt.question(viewListItems, (viewListAnswer) => {
          const list = lists.find((list) => list.id === viewListAnswer);

          if (!list) {
            console.log("sorry list not found...\n");
            appLoop();
            return;
          }

          console.log(list.items);

          appLoop();
        });
        break;

      case "a":
        const addLists = getLists().lists;
        prompt.question(addItemPrompt, (viewListAnswer) => {
          const list = addLists.find((list) => list.id === viewListAnswer);

          if (!list) {
            console.log("sorry list not found...\n");
            appLoop();
            return;
          }

          prompt.question(addItemNamePrompt, (itemName) => {
            addItem(viewListAnswer, itemName);
            appLoop();
          });
        });
        break;

      case "m":
        const markItem = getLists().lists;
        prompt.question(markItemListPrompt, (viewListAnswer) => {
          const list = markItem.find((list) => list.id === viewListAnswer);

          if (!list) {
            console.log("sorry list not found...\n");
            appLoop();
            return;
          }

          console.log(list.items);

          prompt.question(markItemPrompt, (markItemAnswer) => {
            completeItem(viewListAnswer, markItemAnswer);
            appLoop();
          });
        });
        break;

      case "x":
        const deleteItemLists = getLists().lists;
        prompt.question(deleteItemListPrompt, (viewListAnswer) => {
          const list = deleteItemLists.find(
            (list) => list.id === viewListAnswer
          );

          if (!list) {
            console.log("sorry list not found...\n");
            appLoop();
            return;
          }

          console.log(list.items);

          prompt.question(deleteItemIdPrompt, (deleteItemAnswer) => {
            deleteItem(viewListAnswer, deleteItemAnswer);
            appLoop();
          });
        });
        break;

      case "q":
        prompt.close();
        process.exit();
        break;

      default:
        console.log(invalidOption);
        appLoop();
        break;
    }
  });
}

appLoop();

// const newList = createList("My First List");
// addItem(newList.id, "Build a CLI"); // Might be better to return the item, rather than the list
// addItem(newList.id, "Ask for input from CLI");
// getLists();
// completeItem(newList.id, "1"); // Returns the item
// deleteItem(newList.id, "1");
// deleteList(newList.id);
// getLists();

// process.exit();
