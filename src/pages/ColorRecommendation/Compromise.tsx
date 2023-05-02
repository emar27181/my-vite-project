import compromise from 'compromise';
import sentences from 'compromise-sentences';
import { getColorInput } from './FormTemplate';
import { FormTemplate } from './FormTemplate';
import { ColorCode } from './ColorCode';
const DEBUG = true;
let colorCode = "#000000";

export function Compromise() {
  FormTemplate();
  const paragraph = getColorInput();
  if (DEBUG) {
    console.log("before(paragraph): \n" + paragraph);
  }

  const sentences = compromise(paragraph).sentences();
  const terms = compromise(paragraph).terms();
  const firstChar = compromise(paragraph).firstTerms().text();
  const colorSentences = compromise(paragraph).sentences().filter((sentence) => sentence.has("color"));

  if (DEBUG) {
    console.log("after: ");
    //console.log(sentences.map(sentence => sentence.text()));
    //console.log("terms: " + terms.map(term => term.text()));
    //console.log(terms.text());
    //console.log(firstChar);
    //console.log("colorSentences: " + colorSentences.map(colorSentence => colorSentence.text()));
    console.log("colorSentences: " + colorSentences.text());
  }

  //カラーコードへの変換
  colorCode = ColorCode(firstChar);
  if (DEBUG) {
    //console.log("colorCode: " + colorCode);
  }

  return (
    <div>
      <br />
      input: {paragraph} <br />
      output: {colorCode} <br />

    </div>
  );
}

export function getColorCode() {
  const returnColorCode = colorCode;
  return returnColorCode;
}

export default Compromise;