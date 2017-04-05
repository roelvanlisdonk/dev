
export const log: ILogger = {
    error: error,
    info: info,
    warn: warn
};

export interface ILogger {
    error: (message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
}

function error(message: string) {
    log.error(message);
}

function info(message: string) {
    logMessage(message);
}

function warn(message: string) {
    logMessage(message);
}

function logMessage(message: string) {
    if(console) {
        console.log(message);
    }
}