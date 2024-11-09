export enum LogSeverityLevel {
    low = 'Low',
    medium = 'Medium',
    high = 'High'
}

export class LogEntity {
    public level: LogSeverityLevel; //enum
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel){
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);
        
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt);
        
        return log;
    }
}