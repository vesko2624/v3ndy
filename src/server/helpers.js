export const getAvailableId = (collection) => {
    return collection.reduce((maxId, item) => {
        return Math.max(maxId, item.id);
    }, 0) + 1;
}