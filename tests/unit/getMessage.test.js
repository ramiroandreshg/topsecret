const { getMessage } = require('../../src/topsecret/algorithms/v1/get-message');

describe('getMessage v1 unit tests', () => {
  it('should find a message when a given satellite got it complete', async () => {
    const partialMessages = [
      ['este', '', '', 'mensaje', '', '.'],
      ['este', 'es', 'un', 'mensaje', 'secreto', '.'],
      ['este', '', '', 'mensaje', '', '.'],
    ];

    const message = await getMessage(partialMessages);
    expect(message).toBe('este es un mensaje secreto .');
  });

  it('should throw if it finds any missing words', async () => {
    const partialMessages = [
      ['este', '', '', '', '', '.'],
      ['este', 'es', 'un', '', 'secreto', '.'],
      ['este', '', '', '', '', '.'],
    ];
    expect.assertions(1);
    await expect(getMessage(partialMessages)).rejects.toEqual(new Error('There is a missing word in all partial messages.'));
  });

  it('should throw if a partial messages have different lengths', async () => {
    const partialMessages = [['este', '', 'un', '', '', '.'], [], ['', 'es', '', 'mensaje', 'secreto', '.']];
    expect.assertions(1);
    await expect(getMessage(partialMessages)).rejects.toEqual(
      new Error('We need the messages to have the exact same length.')
    );
  });

  it('should find a message when a given every partial message provides at least a word', async () => {
    const partialMessages = [
      ['', '', 'un', 'mensaje', '', ''],
      ['', 'es', '', '', 'secreto', ''],
      ['este', '', '', '', '', '.'],
    ];

    const message = await getMessage(partialMessages);
    expect(message).toBe('este es un mensaje secreto .');
  });
});
