export type Props = List[]

export interface List {
  name: string
  link: string
  submenu?: SubMenu[]
}

export interface SubMenu {
  name: string
  link: string
}
