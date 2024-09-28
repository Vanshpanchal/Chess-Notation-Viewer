import { parse } from '@mliebelt/pgn-parser';
import { useState, useEffect } from 'react';

export default function ChessParse({ fetchedData, pgn }) {
    const [moveNotation, setMoveNotation] = useState([]);

    useEffect(() => {
        const parsePgn = (data) => {
            console.log(data)
            try {
                const parsedPgn = parse(data);
                setMoveNotation(parsedPgn[0].moves);
            } catch (error) {
                console.log("Parsing error", error);
            }
        }

        if (fetchedData) {
            parsePgn(fetchedData);
        } else if (pgn) {
            parsePgn(pgn);
        }
    }, [fetchedData, pgn])

    return moveNotation;
}