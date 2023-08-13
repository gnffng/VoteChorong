import { View, Text, StyleSheet, Button, Platform, PermissionsAndroid } from 'react-native';
import React, { Component } from 'react';
import Contacts from 'react-native-contacts';
import StorageManager from './StorageManager';

import { useDispatch } from 'react-redux';
import { setIsInitAction } from "../utilities/Redux/Reducers/Main/Actions"

const requestContactPermisson = async () => {
    if (Platform.OS === 'ios') {
        console.log('iOS');
        return true;
    } else {
        console.log('Android');
        const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, PermissionsAndroid.PERMISSIONS.READ_CONTACTS]);
        if (granted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED && granted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    }
}

const getContacts = () => {
    requestContactPermisson().then((didGetPermission) => {
        if (didGetPermission) {
            Contacts.getAll().then((err, contacts) => {
                if (err) {
                    throw err;
                }

                console.log(contacts);
                return contacts;
            });
        } else {
            alert('no permission');
        }
    });
}

const addContacts = (newContact) => {
    requestContactPermisson().then((didGetPermission) => {
        if (didGetPermission) {
            Contacts.addContact(newContact).then((err) => {
                if (err) {
                    throw err;
                }
            });
        }
        else {
            alert('no permission');
        }
    });
}

const openForm = () => {
    Contacts.openContactForm({}).then((err) => {
        if (err) console.warn(err);
    });
}

const sync = () => {

    return new Promise((resolve, reject) => {
        requestContactPermisson().then((didGetPermission) => {
            if (didGetPermission) {

                StorageManager.readData().then((originalContacts) => {

                    StorageManager.readIdGenerator().then((idGenerator) => {

                        let id = idGenerator;

                        Contacts.getAll().then((contacts, err) => {

                            if (err) {
                                console.log(JSON.stringify(err));
                                return [];
                            }

                            const newContacts = [];

                            for (const contact of contacts) {
                                const newContact = {};

                                newContact['id'] = id++;
                                newContact['givenName'] = [contact.displayName];
                                newContact['department'] = [contact.department];
                                newContact['emailAddresses'] = contact.emailAddresses;
                                newContact['postalAddresses'] = contact.postalAddresses;
                                newContact['company'] = [contact.company];
                                newContact['phoneNumbers'] = contact.phoneNumbers;
                                newContact['urlAddresses'] = contact.urlAddresses;
                                newContact['note'] = contact.note;
                                newContact['date'] = new Date().toISOString();
                                newContact['isInternalContact'] = true;

                                newContacts.push(newContact);
                            }

                            StorageManager.storeData(originalContacts.filter(contact => !contact.isInternalContact).concat(newContacts)).then((jsonData) => {
                                console.log('end storeData');
                                StorageManager.storeIdGenerator("" + (Number(idGenerator) + Number(newContacts.length))).then(() => {
                                    console.log('end storeIdgenrator');
                                    resolve("");
                                });
                            });

                        });

                    });

                })
            } else {
                alert('no permission');
            }
        });
    });

}

const ContactManager = {
    "requestContactPermisson": requestContactPermisson,
    "getContacts": getContacts,
    "addContacts": addContacts,
    "openForm": openForm,
    "sync": sync
};

export default ContactManager;