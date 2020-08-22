import { Coord } from ".";

export const distance = (a: Coord, b: Coord):number =>
    Math.sqrt(Math.pow(a.x-b.x, 2) + Math.pow(a.y-b.y, 2));

export const collinear = (a: Coord, b: Coord, c: Coord): number => 
    (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y);

export const isBetween = (a: Coord, b: Coord, candidate: Coord): boolean => {
    const epsilon = .0000001
    const isBetween = (a: number, b:number, cand:number):boolean =>
        a <= candidate.y && cand <= b ||
        b <= candidate.y && cand <= a

    if (Math.abs(collinear(a, b, candidate)) > epsilon)
        return false;

    if(a.x === b.x)
        return isBetween(a.y, b.y, candidate.y);


    return isBetween(a.x, b.x, candidate.x);
}