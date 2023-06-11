import { renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { StorageKeys, useStorage } from "./useStorage"

describe('useStorage', () => {
    describe('getFromLocalStorage', () => {
        it('should get a value from the localstorage', () => {
            const { result } = renderHook(() => useStorage())

            const user = result.current.getFromLocalStorage(StorageKeys.Users);

            expect(user).toBeUndefined()
        })
    })    
})