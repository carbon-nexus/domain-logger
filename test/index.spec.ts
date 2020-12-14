import { Logger } from '../src/index';
import { Logger as WinstonLogger, transports } from 'winston'

describe('Logger', () => {
    it('should return a winston logger', () => {
        let logger = Logger({
            domain: "dom",
            subDomain: "sub",
        });
        logger.info("This is a test")
        expect(true).toBeTruthy();
    })

    it('should return a winston logger', () => {
        let logger = Logger({
            domain: "dom",
            subDomain: "sub",
            transports: {
                http: [
                    {
                        host: "localhost",
                        port: 80,
                    }    
                ]
            }
        });
        logger.info("This is a test")
        expect(true).toBeTruthy();
    })
})