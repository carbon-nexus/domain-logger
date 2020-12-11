import { createLogger, Logger as winstonLogger, format, transports as winstonTransports } from 'winston';
import { ConsoleTransportOptions, FileTransportOptions, StreamTransportOptions, HttpTransportOptions } from 'winston/lib/winston/transports';

export function Logger(options: DomainLoggerOptions): winstonLogger {
    // const domainFormat = format.printf(({ level, message, timestamp }) => {
    //     if (options.context) return `[${level}] [${timestamp} ] [${options.domain}:${options.subDomain}:${options.context}]: ${message}`;
    //     else return `[${level}] [${timestamp}] [${options.domain}:${options.subDomain}]: ${message}`;
    // })
    
    let { transports, ...meta } = options
    let fmt = {
        format: format.timestamp(),
    }

    let tports:any = [];
    if(transports){
        for( const [transportType, opts] of Object.entries(transports)) {
            if(transportType === "file") tports.push(new winstonTransports.File({...opts, ...fmt}));
            else if(transportType === "console") tports.push(new winstonTransports.Console({...opts, ...fmt}));
            else if(transportType === "stream") tports.push(new winstonTransports.Stream({...opts, ...fmt}));
            else if(transportType === "http") tports.push(new winstonTransports.Http({...opts, ...fmt}));
        }
    } else {
        tports.push(new winstonTransports.Console())
    }

    const _logger = createLogger({
        level: process.env.LOGGING_LEVEL || "info",
        defaultMeta: {
            ...meta
        },
        transports: tports
    })

    return _logger;
}

interface DomainLoggerOptions {
    domain: string;
    subDomain: string;
    transports?: DomainTransports
    context?: string;
}

interface DomainTransports { 
    console?: ConsoleTransportOptions[],
    file?: FileTransportOptions[],
    stream?: StreamTransportOptions[],
    http?: HttpTransportOptions[]
}
