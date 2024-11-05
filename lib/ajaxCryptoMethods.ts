import * as CryptoJS from "crypto-js"

const keys = {
    key: CryptoJS.enc.Utf8.parse('37911490979715163134003223491201'), //decrypting the key
    secondKey: CryptoJS.enc.Utf8.parse('54674138327930866480207815084989'),
    iv: CryptoJS.enc.Utf8.parse('3134003223491201'),
}

export const generateEncryptAjaxParameters= ($:any, id:any) => {  
    const encrypted_key = CryptoJS.AES.encrypt(id, keys.key, {
      iv: keys.iv,
    });
    const script = $("script[data-name='episode']").data().value;
    const token = CryptoJS.AES.decrypt(script, keys.key, {
      iv: keys.iv,
    }).toString(CryptoJS.enc.Utf8);
    return `id=${encrypted_key}&alias=${id}&${token}`
};

export const decryptEncryptAjaxResponse = async (obj:any) =>{
    const decrypted = CryptoJS.enc.Utf8.stringify(
      CryptoJS.AES.decrypt(obj, keys.secondKey, {
        iv: keys.iv,
      })
    );
    return JSON.parse(decrypted);
};
