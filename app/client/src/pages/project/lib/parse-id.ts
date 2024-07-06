export function parseId(dndId: string) {
    return parseInt(dndId.replace(/\D/g,''))
}