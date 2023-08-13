import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'

const takeContactFromDocument = async () => {
    const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv, "text/comma-separated-values"]
    });

    console.log(res[0]);

    RNFS.readFile(res[0].uri, 'ascii')
        .then(res => {
            const wb = XLSX.read(res, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const arrContacts = XLSX.utils.sheet_to_json(ws, { header: 1 });
            console.log(arrContacts);

            contacts = [];

            for (const i = 1; i < arrContacts.length; i++) {
                for (const j = 0; j < arrContacts[0].length; j++) {
                    switch (arrContacts[i][j]) {

                    }
                }
            }

            return arrContacts;
        });

}

// function to handle exporting
const exportDataToExcel = (data) => {

    // Created Sample data
    let data2 = {
        "id": "4",
        "givenName": ["테스트4", "TEST4"],
        "company": ["Enssel", "inssel"],
        "department": ["IT사업부", "AI개발부"],
        "emailAddresses": [{ "label": "work", "email": "test@enssel.com" }, { "label": "work", "email": "test@test.com" }],
        "phoneNumbers": [{ "label": "mobile", "number": "010-1234-5678" }, { "label": "mobile", "number": "010-1111-0000" }, { "label": "work", "number": "031-123-45678" }, { "label": "work", "number": "031-111-0000" }, { "label": "other", "number": "031-111-2222" }, { "label": "other", "number": "031-333-4444" }],
        "postalAddresses": [{ "label": "work", "street": "경기도 성남시 분당구 성남대로 393 A205" }, { "label": "work", "street": "경기도 성남시 분당구 테스트대로 404-502" }],
        "urlAddresses": [{ "label": "work", "street": "http://www.enssel.com/" }, { "label": "work", "street": "http://www.test.com" }],
        "note": ["사람", "테스트"],
        "date": "2022-10-11T05:57:13.758Z"
    };
    let csvData = data;

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(csvData);
    XLSX.utils.book_append_sheet(wb, ws, "Users")
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/my_exported_file.csv', wbout, 'ascii').then((r) => {
        console.log(RNFS.ExternalStorageDirectoryPath + '/my_exported_file.csv : ' + 'Success');
    }).catch((e) => {
        console.log('Error', e);
    });

}

const ExcelManager = {
    "exportDataToExcel": exportDataToExcel,
    "takeContactFromDocument": takeContactFromDocument
};

export default ExcelManager;