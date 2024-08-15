import type {default as PagerView} from 'react-native-pager-view';
import React, {useRef, useCallback} from 'react';

export default function usePagerView() {
    const pagerRef = useRef<PagerView>(null);

    const setPage = useCallback((page: number, animated = true) => {
        if (animated) {
            console.log(pagerRef.current);
            pagerRef.current?.setPage(page);
        } else {
            console.log(pagerRef.current);
            pagerRef.current?.setPageWithoutAnimation(page);
        }
        console.log('setPage', page);
    }, []);

    return {
        pagerRef,
        setPage
    };
}
