export type DropdownMenuSection = {
    entries: MenuEntry[]
}

export type MenuEntry = {
    title: string
    value?: boolean
    onClick: () => void

    keyboardShortcut?: string
}
