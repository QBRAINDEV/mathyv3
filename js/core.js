const __splash__ = () => {
    try {

        setTimeout(() => {
            document.querySelector(`.splash`).setAttribute(`render`, false)
        }, 3000);

    } catch (_error_) {
        console.log(_error_);
    }
}

const __run__ = () => {
    try {

        __splash__();

        const __controllers = new Controllers();
        const __table_builder = new TableBuilder(__controllers);
        const __tables = new Tables(__controllers);
    } catch (_error_) {
        console.log(_error_);
    }
}

__run__();