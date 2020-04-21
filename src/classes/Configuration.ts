export class Configuration {
    private _serviceUrl?: string;

    get serviceUrl(): string | undefined {
        return this._serviceUrl;
    }

    set serviceUrl(value: string | undefined) {
        this._serviceUrl = value;
    }
}