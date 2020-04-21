import {ApplicationComponent} from "../app.component";

export class Application {
    //singleton application instance
    private static applicationInstance: Application;

    private domRoot: HTMLElement;

    /**
     * Get application instance
     * @returns {Application}
     */
    public static getInstance() {
        if (!Application.applicationInstance) {
            Application.applicationInstance = new Application();
        }
        return Application.applicationInstance;
    }

    public initialize() {
        //create a dom element
        this.domRoot = Application.createDomElement();

        //setup service controller

        //start and mount react
        ApplicationComponent.initialize(this.domRoot);
    }

    public getDomRoot(): HTMLElement {
        return this.domRoot;
    }

    private static createDomElement(): HTMLElement {
        const domRoot: HTMLElement = document.createElement('div');
        document.getElementsByTagName('body').item(0)?.appendChild(domRoot);
        return domRoot;
    }

}