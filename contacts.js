const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');


// reads and return all contacts from contacts.json
const listContacts = async () => {
    try {
        const res = await fs.readFile(contactsPath);
        return JSON.parse(res);
    } catch {
        console.warn('error')
    }
    
}

// returns one contact by ID or null if no such contact
const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(c => c.id === contactId);
        return  contact || null;
    } catch {
        console.log('error')
    }
    
}

// removes a contact specified in contactId and returns removed contact
const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(c => c.id === contactId);
        if(index === -1) return;
        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return result;
    } catch {
        console.log('error');
    }
}

// add new contact to contacts.json and return new contact object
const addContact = async (name, email, phone) => {
    const contact = {
        id:nanoid(),
        name,
        email,
        phone
    }
    
    try {
        const contacts = await listContacts();
        await fs.writeFile(contactsPath, JSON.stringify([...contacts, contact], null, 2));
        return contact;
    } catch {
        console.log('error');
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}