import * as fs from 'fs';
import * as path from 'path';
import { json } from 'express';

// clamp a number between a min and max
export function clamp(val: number, min: number, max: number): number {
    if (max < min) {
        return clamp(val, max, min);
    }
    return Math.min(max, Math.max(min, val));
}

// random number on the normal distrubution
export function randRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// random number on the binomial distrubution
export function randBinom(min: number, max: number, skew: number = 1): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) num = randBinom(min, max, skew); // resample between 0 and 1 if out of range
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
    return num;
}

export function readJSON(fname: string): object {
    if (!fname.endsWith(".json")) {
        fname += '.json';
    }

    return JSON.parse(fs.readFileSync(path.join(__dirname, fname)).toString());
}

export function writeJSON(fname: string, obj: object): void {
    if (!fname.endsWith('.json')) {
        fname += '.json';
    }
    fs.writeFileSync(path.join(__dirname, fname), JSON.stringify(obj));
}

export function writePNG(fname: string, data: string): void {
    if (!fname.endsWith(".png")) {
        fname += '.png';
    }
    let img = data.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(path.join(__dirname, fname), img, 'base64');
}