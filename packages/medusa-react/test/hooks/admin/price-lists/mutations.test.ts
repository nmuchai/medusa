import {
  useAdminCreateBatchPriceList,
  useAdminCreatePriceList,
  useAdminDeleteBatchPriceList,
  useAdminDeletePriceList,
  useAdminUpdatePriceList,
} from "../../../../src"
import { renderHook } from "@testing-library/react-hooks"
import { fixtures } from "../../../../mocks/data"
import { createWrapper } from "../../../utils"

import { PriceListType } from "@medusajs/medusa/dist/types/price-list"

describe("useAdminCreatePriceList hook", () => {
  test("creates a price list and returns it", async () => {
    const priceList = {
      name: "talked to customer",
      type: PriceListType.SALE,
      description: "test",
      prices: [],
    }

    const { result, waitFor } = renderHook(() => useAdminCreatePriceList(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(priceList)

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data.response.status).toEqual(200)
    expect(result.current.data.price_list).toEqual(
      expect.objectContaining({
        ...fixtures.get("price_list"),
        ...priceList,
      })
    )
  })
})

describe("useAdminUpdatePriceList hook", () => {
  test("updates a price list and returns it", async () => {
    const priceList = {
      name: "talked to customer",
      type: PriceListType.SALE,
      prices: [],
      customer_groups: [],
    }

    const { result, waitFor } = renderHook(
      () => useAdminUpdatePriceList(fixtures.get("price_list").id),
      {
        wrapper: createWrapper(),
      }
    )

    result.current.mutate(priceList)

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data.response.status).toEqual(200)
    expect(result.current.data.price_list).toEqual(
      expect.objectContaining({
        ...fixtures.get("price_list"),
        ...priceList,
      })
    )
  })
})

describe("useAdminDeletePriceList hook", () => {
  test("deletes a price list", async () => {
    const { result, waitFor } = renderHook(
      () => useAdminDeletePriceList(fixtures.get("price_list").id),
      {
        wrapper: createWrapper(),
      }
    )

    result.current.mutate()

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data.response.status).toEqual(200)
    expect(result.current.data).toEqual(
      expect.objectContaining({
        id: fixtures.get("price_list").id,
        deleted: true,
      })
    )
  })
})

describe("useAdminDeletePriceListBatch hook", () => {
  test("deletes a money amounts from price list", async () => {
    const { result, waitFor } = renderHook(
      () => useAdminDeleteBatchPriceList(fixtures.get("price_list").id),
      {
        wrapper: createWrapper(),
      }
    )

    result.current.mutate({ price_ids: [fixtures.get("money_amount").id] })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data.response.status).toEqual(200)
    expect(result.current.data).toEqual(
      expect.objectContaining({
        ids: [fixtures.get("money_amount").id],
        deleted: true,
      })
    )
  })
})

describe("useAdminDeletePriceList hook", () => {
  test("Adds prices to price list", async () => {
    const { result, waitFor } = renderHook(
      () => useAdminCreateBatchPriceList(fixtures.get("price_list").id),
      {
        wrapper: createWrapper(),
      }
    )

    result.current.mutate({ prices: [] })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data.response.status).toEqual(200)
    expect(result.current.data).toEqual(
      expect.objectContaining({
        price_list: {
          ...fixtures.get("price_list"),
        },
      })
    )
  })
})