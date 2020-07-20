export type DropdownMenuSection = {
    header?: string
    entries: MenuEntry[]
}

export type MenuEntry = {
    title: string
    value: boolean
    onClick: () => void

    keyboardShortcut?: string
}
