export type ModuleDef = {
  defName: string
  label: string
  graphicData: { texPath: string }
  statBases: any
  costList: Record<string, number>
  recipeMaker: any
  modExtensions: {
    li: {
      weaponTraitDef: string[]
      part: PartDef['defName']
      requiredWeaponTags: {
        li: string[]
      }
    }[]
  }
}

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
