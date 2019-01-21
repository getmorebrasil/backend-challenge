export interface Category {
    name: string,
    childrenIds: [string],
    code: number,
    childrenCodes: [number],
    treeHeight: number,
    root: boolean
}