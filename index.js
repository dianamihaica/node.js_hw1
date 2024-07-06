// const fs = require('fs').promises;
// const path = require('path');

// const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// async function listContacts() {
//   const data = await fs.readFile(contactsPath, 'utf8');
//   return JSON.parse(data);
// }

// async function getContactById(contactId) {
//   const contacts = await listContacts();
//   return contacts.find(contact => contact.id === contactId);
// }

// async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const newContacts = contacts.filter(contact => contact.id !== contactId);
//   await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
//   return newContacts;
// }

// async function addContact(name, email, phone) {
//   const contacts = await listContacts();
//   const newContact = { id: String(contacts.length + 1), name, email, phone };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }

// module.exports = { listContacts, getContactById, removeContact, addContact };
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts());
      break;

    case "get":
      console.log(await getContactById(id));
      break;

    case "add":
      console.log(await addContact(name, email, phone));
      break;

    case "remove":
      console.table(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
