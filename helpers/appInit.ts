import { layoutStore, apiStore } from '@/store';
import { throttle } from 'lodash';
import { isTouchDevice } from './deviceHelpers';

export default {
    created() {
        if (!process.client) return;
        layoutStore.SET_IS_TOUCH_DEVICE(isTouchDevice());
        apiStore.INIT_CURRENT_ENV();

        window.addEventListener(
            'resize',
            throttle(() => {
                if (
                    layoutStore.windowWidth !== window.innerWidth &&
                    layoutStore.breakpoint === 'TABLET_SM'
                )
                    document.documentElement.style.setProperty(
                        '--vh',
                        `${window.innerHeight * 0.01}px`,
                    );

                layoutStore.SET_WINDOW_SIZES({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 50),
            { passive: true },
        );
        if (layoutStore.breakpoint === 'TABLET_SM')
            document.documentElement.style.setProperty(
                '--vh',
                `${layoutStore.windowHeight * 0.01}px`,
            );
        window.addEventListener(
            'scroll',
            throttle(e => layoutStore.SET_WINDOW_SCROLL(e), 50),
            { passive: true },
        );
        window.addEventListener('wheel', layoutStore.SMOOTH_SCROLL, { passive: false });
    },
    mounted() {
        layoutStore.SET_WINDOW_SIZES({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    },
    beforeDestroy() {
        window.removeEventListener(
            'resize',
            throttle(
                () =>
                    layoutStore.SET_WINDOW_SIZES({
                        width: window.innerWidth,
                        height: window.innerHeight,
                    }),
                50,
            ),
        );
        window.removeEventListener('scroll', throttle(layoutStore.SET_WINDOW_SCROLL, 50));
        window.removeEventListener('wheel', layoutStore.SMOOTH_SCROLL);
    },
};
