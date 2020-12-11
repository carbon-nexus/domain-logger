<!-- Badges START -->
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](/.github/CODE_OF_CONDUCT.md)
<!-- Badges END -->

# domain-logger
Create a simple logger, with domain context for logging

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

```typescript
let logger = Logger({
    domain: "dom",
    subDomain: "sub",
});
logger.info("This is a test")
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