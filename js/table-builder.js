class TableBuilder {
    constructor (_controllers_) {

        this.__controllers = _controllers_;
        this.__columns = 0;
        this.__rows = 0;
        this.__insert_columns__ = this.__insert_columns__.bind(this);
        this.__insert_rows__ = this.__insert_rows__.bind(this);
        this.__build_table__ = this.__build_table__.bind(this);
        this.__build__ = this.__build__.bind(this);

        this.__$table_builder = document.querySelector(`.table_builder`);
        this.__$table_controller = document.querySelector(`.table_controller`);
        this.__$build_table_button = document.querySelector(`.build_table`);

        this.__$build_table_button.addEventListener(`click`, this.__build_table__)
        this.__$table_controller.addEventListener(`click`, () => {
            document.querySelector(`.starter`).setAttribute(`render`, false);
           
            document.querySelector(`.table_builder`).setAttribute(`render`, true);
            document.querySelector(`.tables`).setAttribute(`render`, false);

        })

        this.__$insert_columns_button = document.querySelector(`.insert_column`);
        this.__$insert_rows_button = document.querySelector(`.insert_row`);

        this.__$insert_columns_button.addEventListener(`click`, this.__insert_columns__);
        this.__$insert_rows_button.addEventListener(`click`, this.__insert_rows__);

        this.__$columns_grid = document.querySelector(`.area_one`).querySelector(`.grid`);
        this.__$rows_grid = document.querySelector(`.area_two`).querySelector(`.grid`);
        this.__$columns_number = document.querySelector(`.columns_number`);
        this.__$rows_number = document.querySelector(`.rows_number`);

    }

    __build__ () {
        try {

            return new Promise((_resolve_, _reject_) => {

                if (!this.__columns || !this.__rows) {
                    _resolve_(false);
                } else {
                    let __table, __col, __row;
                    
                    try {
                        __table = new Tables(this.__controllers);
                        __table.classList.add(`table_area`);
                        let __titles = document.createElement(`div`);
                        __titles.classList.add(`titles`);

                        for (let i = 0; i < this.__columns; i++) {
                            __col = document.createElement(`input`);
                            __col.setAttribute(`type`, `text`);
                            __titles.append(__col);
                        }

                        __table.append(__titles);

                        for (let x = 0; x < this.__rows; x++) {
                            __row = document.createElement(`div`);
                            __row.classList.add(`rows`);
                            for (let y = 0; y < this.__columns; y++) {
                                __col = document.createElement(`input`);
                                __col.setAttribute(`type`, `text`);
                                __col.classList.add(`row`);
                                __col.onchange = (_e_ => {
                                    _e_.target.setAttribute(`basic`, _e_.target.value);
                                    _e_.target.setAttribute(`result`, math.evaluate(_e_.target.value))
                                })
                                __row.append(__col);
                            }
                            __table.append(__row);
                            
                           
                        }
                        document.querySelector(`.tables`).querySelector(`.editor`).prepend(__table);
                        document.querySelector(`.tables`).querySelector(`.editor`).prepend(__table.__init__());
                        this.__controllers.__total_tables++;
                    } catch (_error_) {
                        _reject_(_error_);
                    }

                    __col = null;
                    __row = null;
                    __table = null;
                    _resolve_(true);
                }
            })

        } catch (_error_) {
            
        }
    }

   async  __build_table__ () {
        try {

            await this.__build__()
            .then(__built_ => {

                if (__built_) {
                    document.querySelector(`.table_builder`).setAttribute(`render`, false);
                    document.querySelector(`.tables`).setAttribute(`render`, true);

                } else {
                    console.log(`couldn't build table`)
                }
            })
            .catch(_error_ => {
                console.log(_error_);
            })

        } catch (_error_) {
            console.log(_error_);
        }
    }

    __insert_columns__ () {
        try {

            let __column = document.createElement(`div`);
            __column.classList.add(`block`);
            __column.classList.add(`column`);
            __column.addEventListener(`click`, (_e_) => {
                _e_.currentTarget.remove();
                this.__columns--;
                this.__$columns_number.textContent = this.__columns;
            })
            this.__$columns_grid.append(__column);
            this.__columns++;
            this.__$columns_number.textContent = this.__columns;
            __column = null;

        } catch (_error_) {
            console.log(_error_);
        }
    }

    __insert_rows__ () {
        try {

            let __row = document.createElement(`div`);
            __row.classList.add(`block`);
            __row.classList.add(`row`);
            __row.addEventListener(`click`, (_e_) => {
                _e_.currentTarget.remove();
                this.__rows--;
                this.__$rows_number.textContent = this.__rows;
            })
            this.__$rows_grid.append(__row);
            this.__rows++;
            this.__$rows_number.textContent = this.__rows;
            __row = null;

        } catch (_error_) {
            console.log(_error_);
        }
    }
}