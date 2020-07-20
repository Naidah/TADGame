export function clamp(val, min, max) {
    if (max < min) {
        return clamp(val, max, min);
    }
    return Math.min(max, Math.max(min, val))
}