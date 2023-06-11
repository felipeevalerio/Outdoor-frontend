import { describe, expect, it } from "vitest";
import { convertFileToBase64 } from "./MediaUtils";

describe('MediaUtils', () => {
    describe('convertFileToBase64', () => {
        it('should convert a file to base64', async () => {
            const blob = new Blob([""]);
            const file = new File([blob], "arquivo");
            
            const base64 = await convertFileToBase64(file);

            expect(base64).toEqual('data:application/octet-stream;base64,');
        })
    })
})