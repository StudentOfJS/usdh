declare type DataHookResult<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
};
declare type UseDataHookProps<T> = {
    url: string;
    init?: RequestInit;
    optimisticData?: T;
    useStaleCache?: boolean;
    retry?: number;
    onError?: (error: Error) => void;
    invalidateCache?: boolean;
    cacheKey?: string;
    expiration?: number;
    errorHandlers?: Record<number, (error: Error) => void>;
};
declare function useData<T>({ url, init, optimisticData, useStaleCache, retry, onError, invalidateCache, cacheKey, expiration, errorHandlers, }: UseDataHookProps<T>): DataHookResult<T>;
export default useData;
