const expect = require('expect');

var {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {

        var from = 'Test Sender';
        var text = 'Test message text';
        var message = generateMessage(from, text);

        expect(message.text).toBe(text);
        expect(message.from).toBe(from);
        expect(typeof message.createdAt).toBe('number');      

    });
});
