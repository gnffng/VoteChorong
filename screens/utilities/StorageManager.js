import React, { Component } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'


const storeData = (data) => {
  try {
    return new Promise((resolve, reject) => {
      const jsonValue = JSON.stringify(data);
      AsyncStorage.setItem('@data', jsonValue).then(() => {
        console.log('storeData : ' + jsonValue);
        resolve(jsonValue);
      });
    });
  } catch (e) {
    // saving error
  }
}

const readData = () => {
  try {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@data', (err, result) => {
        if (err) {
          reject(err);
        }

        if (result === null) {
          resolve([]);
        }

        resolve(JSON.parse(result));
      });
    });
  } catch (e) {
    // saving error
  }
}

const storeIdGenerator = (idGenerator) => {
  try {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem('@idGenerator', idGenerator).then(() => {
        console.log(idGenerator);
        resolve(idGenerator);
      });

    });

  } catch (e) {
    // saving error
  }
}

const readIdGenerator = () => {
  try {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('@idGenerator', (err, result) => {
        if (err) {
          reject(err);
        }

        if (result === null) {
          resolve(1);
        }

        resolve(result);
      });
    });
  } catch (e) {
    // saving error
  }
}

const StorageManager = {
  "storeData": storeData,
  "readData": readData,
  "storeIdGenerator": storeIdGenerator,
  "readIdGenerator": readIdGenerator
};

export default StorageManager;