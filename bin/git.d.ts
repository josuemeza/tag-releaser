export interface Commit {
    key: string;
    message: string;
}
export declare const currentCommit: () => Promise<Commit>;
export declare const pushTag: (tag: string, message: string) => Promise<void>;
