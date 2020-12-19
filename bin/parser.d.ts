export interface Action {
    name: string;
    changes: string[];
}
interface Version {
    key: string;
    date: string;
    actions: Action[];
}
export declare const readLastVersion: () => Version;
export {};
