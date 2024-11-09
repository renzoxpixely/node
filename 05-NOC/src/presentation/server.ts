import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const FileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

export class Server {
    public static start(){
        console.log("server started..!");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.com';
                new CheckService(
                    FileSystemLogRepository,
                    () => console.log( `${ url } is ok`),
                    ( error ) => console.log( error ) ,
                ).execute( url );
            }
        );
    } 
}