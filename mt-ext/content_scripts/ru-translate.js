(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasISEN) {
    return;
  }
  window.hasISEN = true;

  /**
   * Give an alert of the selected text
   */
  function detect_lang(term) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "https://nlp.talgreinir.is/langid/detect?q="+term);
      xhr.send();
      xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
              let response = JSON.parse(xhr.responseText);
              detected_lang=response.responseData.language;
              if (typeof detected_lang !== 'undefined') {
                  if (detected_lang == 'is') { target_lang = 'en';
                  } else { target_lang = 'is';}
                  let moses = new XMLHttpRequest();
                  let postdata = {
                      "contents":[term.toString()],
                      "sourceLanguageCode":detected_lang,
                      "targetLanguageCode": target_lang, "model":"moses"};
                  moses.open("POST", "https://nlp.cs.ru.is/moses/translateText");
                  console.log("hello moses" + term);
                  moses.setRequestHeader('Content-Type', 'application/json');
                  moses.send(JSON.stringify(postdata));
                  moses.onreadystatechange = function() {
                      if (moses.readyState == 4 && moses.status == 200) {
                          var translation = JSON.parse(moses.responseText);
                          alert(translation.translations[0].translatedText);
                      }
                  }
              }
          }
      }
  }

  /**
   * Listen for messages from the background script.
   * Call "detect_lang()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "mt") {
      var term = message.term ? message.term : document.getSelection();
      detect_lang(term);
    }
  });

})();
