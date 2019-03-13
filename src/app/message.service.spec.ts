import { MessageService } from "./message.service";

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
    });

    it('should have no messages to start', () => {
        // Arrange
        service = new MessageService();

        // Assert
        expect(service.messages.length).toBe(0);
    });

    it('should add a messahe when add is called', () => {
        // Arrange
        service = new MessageService();

        // Act
        service.add('message1');

        // Assert
        expect(service.messages.length).toBe(1);
    });

    it('should remove all messages when clear is called', () => {
        // Arrange
        service = new MessageService();
        service.add('message1');
        service.add('message2');

        // Act
        service.clear();

        // Assert
        expect(service.messages.length).toBe(0);
    });
});
