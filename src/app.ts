import { HttpError, MongoContext } from 'tymon';
import { Application } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';

import ProfileController from './controllers/profile_controller';

import ExceptionHandler from './middlewares/exception';
import NotFoundHandler from './middlewares/not_found';

class App {
    private app: Application;
    private port: number = 3000;

    public constructor(port: number) {
        this.app = express();
        this.port = port;

        this.setupPlugins();
        this.setupModules();
        this.setupControllers();
        this.setupExceptionHandlers();
    }

    private setupControllers(): void {
        this.app.use('/profile', new ProfileController().getRoutes());
    }

    private setupModules(): void {
        HttpError.initialize();
        MongoContext.initialize({
            connection_string: '',
            database: ''
        });
    }

    private setupPlugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(cors());
    }

    private setupExceptionHandlers(): void {
        this.app.use(NotFoundHandler);
        this.app.use(ExceptionHandler);
    }

    public start(): void {
        this.app.listen(this.port, (): void => {
            console.info('server started on port: ' + this.port);
        });
    }
}

export default App;
