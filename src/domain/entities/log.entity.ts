
export enum LogSeverityLevel {
    low     = 'low',
    medium  = 'medium',
    high    = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { message, level, origin, createdAt = new Date() } = options;
        this.message    = message;
        this.level      = level;
        this.createdAt   = createdAt;
        this.origin     = origin;
    }

    static fromJson = ( json: string ): LogEntity => {
        json = ( json === '' ) ? '{}': json;
        
        const { message, level, createdAt, origin } =  JSON.parse(json);

        const log = new LogEntity({
            message: message,
            level: level,
            createdAt: createdAt,
            origin: origin,
        });

        return log;

    };

    // Create a factory function basado en objeto

    static fromObject = ( object: {[key: string]: any } ): LogEntity => {
        const { message, level, createdAt, origin } = object;
        const log = new LogEntity({
            message, level, createdAt, origin
        });
        return log;
    }
}