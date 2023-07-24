export const tryCatchAsync = async <T>(
    callback: () => Promise<T> | T
): Promise<T | null> => {
    try {
        return await callback();
    } catch (error) {
        const errorMessage = JSON.stringify(error);
        console.error(errorMessage);

        return null;
    }
};
