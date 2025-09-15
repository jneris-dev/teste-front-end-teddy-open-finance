// src/tests/formats.test.ts

import { formatDateTime } from "../util/formats";
import { vi } from "vitest";

describe("formats utilities", () => {
  it("deve formatar uma data corretamente no formato ISO 8601", () => {
    const mockDate = new Date("2025-01-01T10:30:00");
    vi.spyOn(global, "Date").mockImplementation(() => mockDate as any);

    const formattedDate = formatDateTime(mockDate);

    expect(formattedDate).toBe("2025-01-01T10:30:00");
  });

  it("deve retornar uma string formatada no padrão ISO 8601", () => {
    const mockDate = new Date("2025-01-01T10:30:00");
    vi.spyOn(global, "Date").mockImplementation(() => mockDate as any);

    const formattedDate = formatDateTime(mockDate);

    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    expect(formattedDate).toMatch(dateRegex);
  });
});
