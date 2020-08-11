const handlerMap = {
    NUDGE_LEFT: () => console.log("Nudging"),
    HEAVY_NUDGE_LEFT: () => console.log("Heavy Nudging"),

    SAVE: (e: any) => {
        e.preventDefault();
        console.log("Save")
    },

}

export default handlerMap;