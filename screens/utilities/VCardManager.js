import SendSMS from 'react-native-sms'
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import Mailer from 'react-native-mail';
import Share from 'react-native-share'

import { json } from 'stream/consumers';

import StorageManager from './StorageManager';
import { Linking } from 'react-native';
import base64 from 'react-native-base64'
import Toast from 'react-native-easy-toast';

const takeContactFromDocument = async () => {
    const res = await DocumentPicker.pick({
        type: ["text/vcard", "text/x-vcard"]
    });

    // console.log(res[0]);
    const answer = "";


    return RNFS.readFile(res[0].uri, 'ascii')
        .then(res => {
            console.log(res);

            const jsonContact = {};

            const company = [];
            const department = [];
            const email = [];
            const phoneNumber = [];
            const workCellphoneNumber = [];
            const otherCellphoneNumber = [];
            const addresses = [];
            const homepage = [];

            const contact = res.split('\r');

            for (var i = 2; i < contact.length - 2; i++) {
                const jsonItem = contact[i].trim().split(':');

                if (jsonItem.length < 2) {
                    continue;
                }

                const keyWithOption = jsonItem[0].split(';');
                const valueWithOption = jsonItem[1].split(';');

                switch (keyWithOption[0]) {

                    case "FN":
                        if (keyWithOption.length > 1) {
                            const decodedString = decodeURIComponent(valueWithOption[0].toString().replace(/=/gi, "%"));
                            jsonContact['givenName'] = [decodedString];
                        }
                        else {
                            jsonContact['givenName'] = [valueWithOption[0]];
                        }
                        break;

                    case "ORG":
                        if (keyWithOption.length > 1) {
                            const decodedString = decodeURIComponent(valueWithOption[0].toString().replace(/=/gi, "%"));
                            const [_company, _department] = decodedString.split(';');

                            company.push(_company);
                            if (_department != null) {
                                department.push(_department);
                            }

                        }
                        else {
                            const [_company, _department] = valueWithOption[0].split(';');

                            company.push(_company);
                            if (_department != null) {
                                department.push(_department);
                            }
                        }
                        break;

                    case "EMAIL":
                        email.push(valueWithOption[0]);
                        break;

                    case "ADR":
                        while (valueWithOption[2].charAt(valueWithOption[2].length - 1) == '=') {
                            valueWithOption[2] = valueWithOption[2].slice(0, valueWithOption[2].length - 1) + contact[++i].slice(1).replace(/;/gi, "");
                        }

                        const decodedAdress = decodeURIComponent(valueWithOption[2].toString().replace(/=/gi, "%"));
                        addresses.push(decodedAdress);
                        break;

                    case "LABEL":
                        while (valueWithOption[0].charAt(valueWithOption[0].length - 1) == '=') {
                            valueWithOption[0] = valueWithOption[0].slice(0, valueWithOption[0].length - 1) + contact[++i].slice(1).replace(/;/gi, "");
                        }

                        const decodedLabel = decodeURIComponent(valueWithOption[0].toString().replace(/=/gi, "%")).replace(/\r/gi, "").replace(/\n/gi, "");
                        addresses.push(addresses.pop() + " " + decodedLabel);
                        break;

                    case "TEL":
                        if (keyWithOption[1] == "CELL") {
                            phoneNumber.push(valueWithOption[0]);
                        }
                        else if (keyWithOption[1] == "WORK") {
                            workCellphoneNumber.push(valueWithOption[0]);
                        }
                        else {
                            otherCellphoneNumber.push(valueWithOption[0]);
                        }

                        break;

                    case "NOTE":
                        if (keyWithOption.length > 1) {
                            const decodedString = decodeURIComponent(valueWithOption[0].toString().replace(/=/gi, "%"));
                            jsonContact['note'] = decodedString;
                        }
                        else {
                            jsonContact['note'] = valueWithOption[0];
                        }
                        break;

                    case "URL":
                        homepage.push(valueWithOption[0] + jsonItem[2]);
                        break;

                }

                console.log(jsonItem[0] + " / " + jsonItem[1]);
            }

            jsonContact['company'] = company;
            jsonContact['department'] = department;
            jsonContact['email'] = email;
            jsonContact['addresses'] = addresses;
            jsonContact['homepage'] = homepage;
            jsonContact['phoneNumber'] = phoneNumber;
            jsonContact['workCellphoneNumber'] = workCellphoneNumber;
            jsonContact['otherCellphoneNumber'] = otherCellphoneNumber;
            jsonContact['date'] = new Date().toISOString();

            console.log("JsonContact : " + JSON.stringify(jsonContact));

            return jsonContact;
        });

}

const dataToVcf = (data) => {
    let vcfData = "BEGIN:VCARD" + '\r\n';
    vcfData += "VERSION:2.1" + '\r\n';
    vcfData += "FN;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:" + encodeURIComponent(data.givenName[0]).replace(/%/gi, '=') + '\r\n';
    vcfData += "ORG;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:" + encodeURIComponent(data.company[0] + ';' + data.department[0]).replace(/%/gi, '=') + '\r\n';

    for (const em of data.emailAddresses) {
        vcfData += "EMAIL:" + em.email + '\r\n';
    }

    for (const address of data.postalAddresses) {
        vcfData += "ADR;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:;;" + encodeURIComponent(address.street).replace(/%/gi, '=') + '\r\n';
    }

    for (const url of data.urlAddresses) {
        vcfData += "URL;CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE:" + url.url + '\r\n';
    }

    for (const tel of data.phoneNumbers) {
        let phoneType = 'VOICE';
        if (tel.label == 'mobile') {
            phoneType = 'CELL';
        }
        else if (tel.label == 'work') {
            phoneType = 'WORK';
        }
        vcfData += "TEL;" + phoneType + ":" + tel.number + '\r\n';
    }

    vcfData += "END:VCARD" + '\r\n';

    return vcfData;
}

// function to handle exporting
const exportDataToVcf = (data, path) => {

    let vcfData = dataToVcf(data);

    console.log(vcfData);

    const filePath = path + '/' + data.givenName[0] + '-' + new Date().toISOString().replace(/:/gi, '-') + '.vcf';
    RNFS.writeFile(filePath, vcfData, 'ascii').then((r) => {
        console.log(filePath + ' : Success');

    }).catch((e) => {
        console.log('Error', e);
    });

    return filePath;
}

// function to handle exporting
const exportDataToMail = async (path, arrSelectedDataId) => {
    await StorageManager.readData().then((jsonData) => {
        const filteredJson = jsonData.filter(data => arrSelectedDataId.includes(data.id));
        // const filteredJsonData = filteredJson[0];
        let attachments = [];
        let count = filteredJson.length;
        let semaphore = true;

        for (const filteredJsonData of filteredJson) {
            let vcfData = dataToVcf(filteredJsonData);

            const filePath = path + '/' + filteredJsonData.givenName[0] + '-' + new Date().toISOString().replace(/:/gi, '-') + '.vcf';

            RNFS.writeFile(filePath, vcfData, 'ascii')
                .then((r) => {
                    while (!semaphore) {
                        sleep(100, 'w1');
                    }

                    semaphore = false;

                    console.log(filePath + ' : Success');
                    attachments.push({
                        path: filePath,
                        mimeType: 'text/x-vcard',
                    });

                    count--;
                    semaphore = true;

                    if (count <= 0) {
                        console.log(attachments);
                        Mailer.mail({
                            // Optional additional arguments
                            attachments: attachments,
                            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
                        }, (error, event) => {
                            console.log('error', error)
                        });
                    }
                })
                .catch((e) => {
                    console.log('Error', e);
                });
        }
    });
}

// function to handle exporting
const exportDataToMessage = (path, arrSelectedDataId) => {
    // Linking.openURL('sms://01033124677?body=1243');

    StorageManager.readData().then((jsonData) => {

        const filteredJsonData = jsonData.filter(data => arrSelectedDataId.includes(data.id))[0];
        const vcfData = dataToVcf(filteredJsonData);

        const filePath = path + '/' + filteredJsonData.givenName[0] + '-' + new Date().toISOString().replace(/:/gi, '-') + '.vcf';

        RNFS.writeFile(filePath, vcfData, 'ascii')
            .then((r) => {
                share(filePath);
            })
            .catch((e) => {
                console.log('Error', e);
            });
    });
}

const share = (url) => {
    let option = {
        title: 'Share via',
        url: 'file://' + url,
        social: Share.Social.MESSENGER,
        filename: 'test'
    };

    Share.shareSingle(option)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
}

const VcardManager = {
    "exportDataToVcf": exportDataToVcf,
    "takeContactFromDocument": takeContactFromDocument,
    "exportDataToMail": exportDataToMail,
    "exportDataToMessage": exportDataToMessage
};

export default VcardManager;