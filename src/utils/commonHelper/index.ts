export function randomString(length: number = 12) {
    return Math.round(
        Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
    )
        .toString(36)
        .slice(1);
}
