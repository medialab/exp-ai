import messagesFr from "../contents/messages.fr.yml";

export default function (key, lang = "fr") {
  if (lang === "fr") {
    return messagesFr[key] || key;
  }
}
