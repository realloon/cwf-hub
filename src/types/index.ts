export type AdapterDef = {
  defName: string
  graphicData: any[]
  weaponTags: string[]
  comps: any[]
  moduleGraphicOverrides: any[]
}

export type ThingCategoryDef = {
  defName: string
  label: string
  parent: string
  iconPath: string
}

export type PartDef = {
  defName: string
  label: string
  group: 'Top' | 'Bottom' | 'Left' | 'Right'
  order: number
  fallbackTexturePath: string
}
