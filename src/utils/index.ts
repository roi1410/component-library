interface Item {
    [key: string]: any;
}
export function groupByValue<T extends Item>(key: keyof T, objArr: T[]): Record<string, T[]> {
    const groupByValueObj = objArr.reduce((acc, obj) => {
        const keyValue = obj[key];
        if (!acc[keyValue]) {
            acc[keyValue] = [];
        }
        acc[keyValue].push(obj);
        return acc;
    }, {} as Record<string, T[]>);
    return groupByValueObj;
}

export function keyByValue<T extends Item>(key: keyof T, objArr: T[]): Record<string, T> {
    const KeyValueObj = objArr.reduce((acc, obj) => {
        const keyValue = obj[key];
        if (obj[key]) {
            acc[keyValue] = obj;
        }
        return acc;
    }, {} as Record<string, T>);

    return KeyValueObj;
}
