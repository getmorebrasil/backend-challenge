import {Source} from "../events/Source";
import {Application} from "../Application";
import * as path from 'path';

export class TestManager extends Source {
    private application: Application;

    constructor(callback) {
        super();

        this.hub.on('app.ready', () => callback() );

        this.application = new Application(path.resolve('test/config.json'));
    }

    async destroy () {
        return await this.application.destroy();
    }

}