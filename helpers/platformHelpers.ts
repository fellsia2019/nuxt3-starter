export const isIos = (): boolean => {
    if (navigator?.platform)
        return ['iPhone Simulator', 'iPod Simulator', 'iPhone', 'iPod'].includes(
            navigator.platform,
        );
    console.error('Cant define device type: navigator.platform not definded');
    return false;
};
