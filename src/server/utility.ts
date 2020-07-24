export function clamp(val: number, min: number, max: number): number {
    if (max < min) {
        return clamp(val, max, min);
    }
    return Math.min(max, Math.max(min, val))
}