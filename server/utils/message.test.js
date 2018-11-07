const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');


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


describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Test Sender';
        var lat = 1;
        var long = 1;
        var message = generateLocationMessage(from, lat, long);

        expect(message.from).toBe(from);
        expect(message.url).toBe('https://www.google.com/maps?q=1,1');
        expect(typeof message.createdAt).toBe('number');

    });
});