declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            SPOTIFY_BASE_URL: string;
        }
    }
}