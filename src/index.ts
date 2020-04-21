/**
 * Typescript React application
 * Author: Binu Balan <support@binubalan.com>
 * Application initialize
 * self invoking function to start the application context safely!
 * */
import {Application} from "./classes/Application";

(() => {
    Application
        .getInstance()
        .initialize();
})();

