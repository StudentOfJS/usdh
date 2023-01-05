declare function useBackgroundFetch(url: string, init?: RequestInit): {
    data: any;
    error: any;
    loading: boolean;
};
export default useBackgroundFetch;
