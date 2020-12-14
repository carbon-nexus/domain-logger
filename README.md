<!-- Badges START -->
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](/.github/CODE_OF_CONDUCT.md)
<!-- Badges END -->

# domain-logger
Create a simple logger, with domain context for logging

## Motivation
Creating a logger is a standard practice for any application; in some cases you may want to propagate those logs to a file or even HTTP for other logging solutions (ie Splunk or Elasticsearch) to index for easy searching. 

This module is intended to be lightweight anf focused on Domain Driven Design. In simplest definition, every microservice is bound to a domain/sub-domain. Furthermore, a microservice should have some transaction ID for easy tracking of an entire workflow. With this logger, your can quickly pass in `domain`, `subDomain` and `context` (where context is the transaction ID or whatever makes sense for your microservive). 

If you need to configure an [HTTP](https://github.com/winstonjs/winston/blob/master/docs/transports.md#http-transport) transport, you would do so by supplying Winston arguments to the logger instantiation. A sample is found within the usage section

## Current Support
Winston v3.x

## Installation
```
npm i domain-logger
``` 
or
```
yarn add domain-logger
```

## Usage
Implicit Console transport:

```typescript
let logger = Logger({
    domain: "dom",
    subDomain: "sub",
});
logger.info("This is a test")
```

Explicit HTTP transport (no Console Transport):

```typescript
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
```

options to be supplied to the logger:

```typescript
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
```

### Sample Output 

```
logger.info("This is a test")
// ---------Output---------
//
//  {
//    domain: "dom",
//    level: "info",
//    message: "This is a test",
//    subDomain: "sub"
//  }
```