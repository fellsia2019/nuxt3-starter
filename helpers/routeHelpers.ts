import { apiStore } from '@/store';
import { replace } from 'lodash';

const paramsParser = (inputString: string, params: { [key: string]: string | number }) => {
    Object.entries(params).forEach(([key, value]) => {
        inputString = replace(inputString, `%${key}%`, String(value));
    });
    return inputString;
};

const queryParser = (query: { [key: string]: string | number | Array<string | number> }) => {
    const result = Object.entries(query)
        .reduce((acc: string[], [key, value]) => {
            if (!value || (Array.isArray(value) && !value.length)) return acc;
            if (Array.isArray(value)) {
                acc.push(
                    ...(value?.map((currentValue: string | number) => `${key}[]=${currentValue}`) ||
                        []),
                );
            } else acc.push(`${key}=${value}`);
            return acc;
        }, [])
        .join('&');

    return result ? `?${result}` : '';
};

// Строим маршруты
export const getRoute = (
    service: string,
    route: string,
    params?: { [key: string]: string | number },
    query?: { [key: string]: string | number | Array<string | number> },
): string => {
    const servicesInstance = apiStore.SERVICES;

    if (!servicesInstance[service]) {
        console.error(service + ': no such service');
        return '';
    }
    let p = params
        ? paramsParser(servicesInstance[service].routes[route], params)
        : servicesInstance[service].routes[route];
    let q = queryParser(query || {});

    return `http${servicesInstance[service].secure ? 's' : ''}://${
        servicesInstance[service].domain
    }/${p}${q}`;
};

// Обрабатываем ответ
export function getResponseData<T>(response: {
    data: {
        result: T;
        limit?: number;
        total?: number;
        offset?: number;
        error: boolean;
        message: string;
    };
    status: number;
    config:
        | {
              method: string;
              url: string;
          }
        | false;
}): { error: boolean; result: T; limit: number; total: number; offset: number; message: string } {
    if (response?.data?.error) console.error(response.data.message);

    return {
        message: response?.data?.message || '',
        result: response?.data?.result,
        error: response?.data?.error,
        total: response?.data?.total || 0,
        limit: response?.data?.limit || 0,
        offset: response?.data?.offset || 0,
    };
}

// Открываем внешнюю ссылку
export const openExtUrl = (url: string, target = '_blank'): void => {
    url ? window.open(url, target) : console.error('No url given');
};

export const downloadFileFromExtUrl = (data: { file: string; name: string }): void => {
    if (!data.file) console.error('No found path to file');
    const extension = data.file.split('.').pop();
    fetch(data.file)
        .then(res => res.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            document.body.appendChild(link);
            link.setAttribute('download', data.name + '.' + extension);
            link.href = url;
            link.click();
            document.body.removeChild(link);
        });
};
