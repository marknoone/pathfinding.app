export type DropdownMenuSection = {
    header?: string
    entries: DropdownMenuEntry[]
}

export type DropdownMenuEntry = {
    title: string
    type: 'button' | 'toggle'
    onClick: () => void

    keyboardShortcut?: string
    children?: DropdownMenuEntry[]
}