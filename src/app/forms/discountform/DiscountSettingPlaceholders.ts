import {
  FixedValueDiscountSettings,
  MinProductCountSettings,
  PercentageDiscountSettings,
  TimeWindowDiscountSetting
} from "../../models/discount/discountSettings";

export const TimeWindowRuleSetting: TimeWindowDiscountSetting = {
  version: 0,
  name: "Christmas period",
  fromTime: "2022-12-15",
  toTime: "2022-12-30"
}

export const MinProductCountRuleSetting: MinProductCountSettings = {
  version: 0,
  name: "Necklace small",
  numberOfItems: 3,
  productId: "ff66c1f5-d79e-4797-a03c-a665ae26b171",
}

export const PercentageDiscountActionSettings: PercentageDiscountSettings = {
  version: 0,
  name: "small percentage discount",
  value: 0.03
}

export const FixedValueDiscountActionSettings: FixedValueDiscountSettings = {
  version: 0,
  name: "small fixed value discount",
  value: 5,
}
