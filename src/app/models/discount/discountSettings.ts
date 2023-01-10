export interface DiscountSettingRaw{
  id: string,
  name?: string,
  rule: DiscountMetadataSettingRaw,
  action: DiscountMetadataSettingRaw,
  shopId: string,
  concurrencyToken?: string
}

export interface DiscountSettingForCreation {
  id: string,
  name?: string,
  rule: DiscountMetadataSettingRaw,
  action: DiscountMetadataSettingRaw
}

export interface DiscountMetadataSettingRaw {
  id: string
  parameters: FixedValueDiscountSettings | PercentageDiscountSettings
              | MinProductCountSettings | TimeWindowDiscountSetting
}

export interface DiscountParameters {
  version: number,
  name: string
}


export interface  FixedValueDiscountSettings extends  DiscountParameters {
  value: number
}

export interface  PercentageDiscountSettings extends  DiscountParameters {
  value: number
}

export interface MinProductCountSettings extends  DiscountParameters {
  productId: string,
  numberOfItems: number
}

export interface TimeWindowDiscountSetting extends  DiscountParameters {
  fromTime: string,
  toTime: string
}
