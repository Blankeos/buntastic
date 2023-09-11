import { expect, test } from "bun:test"
import { getCarlo } from "./getCarlo"

test("must start with 'Car'", () => {
    expect(getCarlo()).toStartWith("Car")
})

test("must end with lo", () => {
    expect(getCarlo()).toEndWith("lo")
})