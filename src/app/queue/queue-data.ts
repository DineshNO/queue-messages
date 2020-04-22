import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Queue } from '../shared/queue.model';
import { Observable } from 'rxjs';
import { RequestInfo } from "angular-in-memory-web-api";

export class QueueData implements InMemoryDbService {


    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
        const queues: Queue[] = [
            new Queue('layout', 5, false),
            new Queue('nm', 5, false),
            new Queue('b2b', 5, true)
        ]
        return queues;
    }

}