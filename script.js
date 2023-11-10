// ==UserScript==
// @name         Lab4_script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Lab_4
// @author       You
// @match        https://cripto.tiiny.site/
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {

    const p_tags = document.querySelector('p').textContent;

    const key_no_formatted = p_tags.match(/[A-Z]/g);
    const key = key_no_formatted ? key_no_formatted.join('') : 'None';
    console.log('La llave es:', key);

    //cantidad de divs (MENSAJES)
    var divCount = document.querySelectorAll('div').length;
    console.log('Los mensajes cifrados son:', divCount);
    //considera los primeros 24 bytes 3des:
    const parsed_key = CryptoJS.enc.Utf8.parse(key.substr(0, 24));


    var divElements = document.querySelectorAll('div');
    var id_values = [];

    divElements.forEach(function(div) {
        var idValue = div.id;
        id_values.push(idValue);
        //console.log(idValue);
    });

    id_values.forEach(curr => {
        const decryptedId = CryptoJS.TripleDES.decrypt(curr, parsed_key, {mode: CryptoJS.mode.ECB});

        console.log(`${curr}  ${decryptedId.toString(CryptoJS.enc.Utf8)}`);
        const newPTag = document.createElement('p');

        newPTag.textContent = decryptedId.toString(CryptoJS.enc.Utf8);

        document.body.appendChild(newPTag);
    });

})();