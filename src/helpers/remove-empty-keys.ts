const removeEmptyKeys = (obj: Record<string, string>) =>
    Object.keys(obj).reduce((acc: Record<string, string>, key) => {
        if (obj[key] !== '') {
            acc[key] = obj[key];
        }
        return acc;
    }, {});

export default removeEmptyKeys;
