// client/src/lib/utils.test.ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("should concatenate class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
});
