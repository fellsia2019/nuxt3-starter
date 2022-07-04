export interface Iservice {
    domain: string;
    secure: boolean;
    routes: { [key: string]: string };
}

export interface IserviceList {
    [key: string]: Iservice;
}

export interface IEnviroment {
    ENV_NAME: 'dev' | 'test' | 'preprod' | 'prod';
    APP_NAME: string;
    SSR_MODE: 'true' | 'false';
    PORT: number;
    IS_CLIENT_SERVER: 'true' | 'false';
    domains: { [key: string]: string };
    deploy: {
        exec_mode: string;
        instances: number;
    };
    allowedRoutes: string[];
}
