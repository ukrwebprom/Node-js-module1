const contacts = require('./contacts');
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
        const allContacts = await contacts.listContacts();
        if(allContacts) console.table(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      if(oneContact) console.table(oneContact);
      break;

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      if(addContact) console.table(addContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      if(removedContact) console.table(removedContact)
      else console.log('NO SUCH CONTACT');
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);