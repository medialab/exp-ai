import messagesFr from "../contents/messages.fr.yml";

function translate(key, lang = "fr") {
  if (lang === "fr") {
    if (!messagesFr[key]) {
      console.warn("unstranslated key: ", key);
    }
    return messagesFr[key] || key;
  }
}

export default translate;
