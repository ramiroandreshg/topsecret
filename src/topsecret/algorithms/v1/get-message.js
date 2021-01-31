const validatePartialMessages = (partialMessages) => {
  if (partialMessages.length !== 3) {
    return new Error('We need exactly 3 partial messages.');
  }

  const msgALenght = partialMessages[0].length;
  const msgBLenght = partialMessages[1].length;
  const msgCLenght = partialMessages[2].length;

  if (msgALenght !== msgBLenght || msgBLenght !== msgCLenght) {
    return new Error('We need the messages to have the exact same length.');
  }
};

/*
 preconditions for v1:
  exactly 3 partialmessages
  messages have the same exact length
  there's no phasing between them
*/
const getMessage = (partialMessages) => {
  return new Promise((resolve, reject) => {
    const validationError = validatePartialMessages(partialMessages);
    if (validationError) {
      reject(validationError);
    }

    const msgA = partialMessages[0];
    const msgB = partialMessages[1];
    const msgC = partialMessages[2];
    if (msgA.length === 0 || msgB.length === 0 || msgC.length === 0) {
      reject(new Error('Empty partial messages.'));
    }
    const strArray = [];
    for (let i = 0; i < msgA.length; i += 1) {
      let word;
      if (msgA[i] !== '') {
        word = msgA[i];
      } else if (msgB[i] !== '') {
        word = msgB[i];
      } else if (msgC[i] !== '') {
        word = msgC[i];
      } else {
        reject(new Error('There is a missing word in all partial messages.'));
      }
      strArray.push(word);
    }
    resolve(strArray.join(' '));
  });
};

module.exports = {
  getMessage,
};
