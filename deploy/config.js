exports.script = "./node_modules/nuxt/bin/nuxt.js";
exports.mockServerscript = "./node_modules/@mocks-server/main/bin/mocks-server";

exports.removeLockFile = false;
exports.removeNodeModules = false;
//
const APP_NAME = "Tess-nuxt-frontend";
const MOCK_SERVER_NAME = APP_NAME + "_mock-server";
const SSR_MODE = "true";

exports.branchConfig = () => {
  return {
    // Локальные ветки
    dev: {
      ENV_NAME: "dev",
      APP_NAME: `${APP_NAME}_dev`,
      SSR_MODE: `${SSR_MODE}`,
      ALLOW_CONFIG: "true",
      // Порт запуска инстанса приложения
      PORT: 3000,
      MOCK_SERVER_PORT: 3030,
      // Домены, которые будут доступны в конфиге приложения
      domains: {
        mock: "localhost:3030",
        main: "test.backend.tess.kay-com.net",
      },
      allowedRoutes: [],
    },
    // Ветка dev
    test: {
      ENV_NAME: "test",
      APP_NAME: `${APP_NAME}_test`,
      MOCK_SERVER_NAME: `${MOCK_SERVER_NAME}_test`,
      SSR_MODE: `${SSR_MODE}`,
      ALLOW_CONFIG: "true",
      PORT: 3001,
      MOCK_SERVER_PORT: 3031,
      IS_CLIENT_SERVER: "false",
      branchName: "dev",
      domains: {
        mock: "localhost:3031",
        main: "test.backend.tess.kay-com.net",
      },
      deploy: {
        exec_mode: "cluster",
        instances: 1,
      },
      allowedRoutes: [],
    },
    // Препрод ветка prod
    preprod: {
      ENV_NAME: "preprod",
      APP_NAME: `${APP_NAME}_preprod`,
      MOCK_SERVER_NAME: `${MOCK_SERVER_NAME}_preprod`,
      SSR_MODE: `${SSR_MODE}`,
      ALLOW_CONFIG: "false",
      PORT: 3002,
      MOCK_SERVER_PORT: 3032,
      IS_CLIENT_SERVER: "false",
      branchName: "master",
      domains: {
        mock: "localhost:3032",
        main: "test.backend.tess.kay-com.net",
      },
      deploy: {
        exec_mode: "cluster",
        instances: 1,
      },
      allowedRoutes: [
        "index",
        "services",
        "services-slug",
        "projects",
        "partners",
        "vacancies",
        "vacancies-slug",
      ],
    },
    // Прод ветка prod
    prod: {
      ENV_NAME: "prod",
      APP_NAME: `${APP_NAME}_prod`,
      SSR_MODE: `${SSR_MODE}`,
      ALLOW_CONFIG: "false",
      PORT: 3002,
      IS_CLIENT_SERVER: "true",
      domains: {
        mock: "example.com",
        main: "test.backend.tess.kay-com.net",
      },
      deploy: {
        exec_mode: "cluster",
        instances: 1,
      },
      allowedRoutes: [
        "index",
        "services",
        "services-slug",
        "projects",
        "partners",
        "vacancies",
        "vacancies-slug",
      ],
    },
  };
};
