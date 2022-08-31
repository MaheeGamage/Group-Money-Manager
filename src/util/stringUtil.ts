export function generateMemberId(name: string) {
    return name.toLowerCase().replace(/\s/g, '_');
}