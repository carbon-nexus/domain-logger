import { Logger } from '../src/index';
import { Logger as WinstonLogger } from 'winston'

describe('Logger', () => {
    it('should return a winston logger', () => {
        let logger = Logger({
            domain: "dom",
            subDomain: "sub",
        });
        logger.info("This is a test")
        expect(true).toBeTruthy();
    })
})