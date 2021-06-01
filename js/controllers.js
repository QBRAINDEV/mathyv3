class Controllers {
    constructor () {
        
        this.__total_tables = 0;
        this.__select_operator__ = this.__select_operator__.bind(this);
        this.__get_tables_config__ = this.__get_tables_config__.bind(this);
        this.__generate_additions__ = this.__generate_additions__.bind(this);
        this.__generate_substractions__ = this.__generate_substractions__.bind(this);
        this.__generate_multiplications__ = this.__generate_multiplications__.bind(this);
        this.__generate_divisions__ = this.__generate_divisions__.bind(this);

        this.__$spreadsheet_controller = document.querySelector(`.spreadsheet_controller`);
        this.__$plus_operator = document.querySelector(`.plus_controller`);
        this.__$pminus_operator = document.querySelector(`.minus_controller`);
        this.__$multiply_operator = document.querySelector(`.multiply_controller`);
        this.__$divide_operator = document.querySelector(`.divide_controller`);
        this.__$delete_all_button = document.querySelector(`.delete_all_button`);
        this.__$calculator_controller = document.querySelector(`.calculator_controller`);
        this.__$generate_button = document.querySelector(`.generate_button`);
        this.__$generate_button.addEventListener(`click`, () => {
            if (this.__total_tables) {
                window.print();
            }
        })

        this.__$calculator_controller.addEventListener(`click`, (_e_) => {

            if (!_e_.target.hasAttribute(`on`)) {
                this.__get_tables__().forEach(_table_ => {
                    _table_.querySelectorAll(`.row`).forEach(_row_ => {
                        if (_row_.hasAttribute(`basic`)) {
                            _row_.value = `${_row_.getAttribute(`basic`)} = ${_row_.getAttribute(`result`)}`;
                        } else if (_row_.value.length) {
                            _row_.setAttribute(`basic`, `${_row_.value} = `)
                            _row_.setAttribute(`result`, math.evaluate(_row_.value));
                            _row_.value = `${_row_.value} = ${math.evaluate(_row_.value)}`;
                        }
                    })
                })
                _e_.target.setAttribute(`on`, true)
            } else {
                this.__get_tables__().forEach(_table_ => {
                    _table_.querySelectorAll(`.row`).forEach(_row_ => {
                        if (_row_.hasAttribute(`basic`)) {
                            _row_.value = `${_row_.getAttribute(`basic`)}`;
                        }
                    })
                })
                _e_.target.removeAttribute(`on`)
            }
        })
        this.__$delete_all_button.addEventListener(`click`, () => {
            this.__total_tables = 0;
            document.querySelector(`.tables`).querySelectorAll(`.remove_table`).forEach(_table_ => {
                _table_.remove();
            })
            document.querySelector(`.tables`).querySelectorAll(`mathy-table`).forEach(_table_ => {
                _table_.remove();
            })
            this.__$calculator_controller.querySelector(`.button`).removeAttribute(`on`);
            document.querySelector(`.table_builder`).setAttribute(`render`, true);
            document.querySelector(`.tables`).setAttribute(`render`, false);

        })
        this.__$spreadsheet_controller.addEventListener(`click`, () => {
            
            if ( this.__total_tables) {
                document.querySelector(`.starter`).setAttribute(`render`, false);
                document.querySelector(`.table_builder`).setAttribute(`render`, false);
                document.querySelector(`.tables`).setAttribute(`render`, true);
            }
        })
        this.__$plus_operator.addEventListener(`click`, this.__select_operator__);
        this.__$pminus_operator.addEventListener(`click`, this.__select_operator__);
        this.__$multiply_operator.addEventListener(`click`, this.__select_operator__);
        this.__$divide_operator.addEventListener(`click`, this.__select_operator__);

        // config
        this.__$min_range = document.querySelector(`.tables`).querySelector(`.config`).querySelector(`.min_range`).querySelector(`input`);
        this.__$max_range = document.querySelector(`.tables`).querySelector(`.config`).querySelector(`.max_range`).querySelector(`input`);

    }

    static __min_max__ (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    __get_tables_config__ () {
        try {

            this.__tables_config = {
                min_range: parseInt(this.__$min_range.value),
                max_range: parseInt(this.__$max_range.value)
            }

           

            if (isNaN(this.__tables_config.min_range) || isNaN(this.__tables_config.max_range)  || this.__tables_config.min_range == 0 || this.__tables_config.max_range == 0 || (this.__tables_config.min_range == this.__tables_config.max_range)) {
                return false;
            } else {
                return true;
            }
        } catch (_error_) {
            console.log(_error_);
        }
    }

    __get_tables__ () {
        try {

            return document.querySelector(`.tables`).querySelectorAll(`.table_area`);

        } catch (_error_) {
            console.log(_error_);
        }
    }

    __generate_by_operator__ (_method_, _tables_) {
        try {

            return new Promise((_resolve_, _reject_) => {
                _tables_.forEach(_table_ => {
                    _table_.querySelectorAll(`.row[selected = "true"]`).forEach(_row_ => {
                        
                        try {
                            
                            let __expression = _method_();
                            _row_.value = __expression.basic;
                            _row_.setAttribute(`basic`, __expression.basic);
                            _row_.setAttribute(`result`, __expression.result);

                            _row_.removeAttribute(`selected`);
                            
                        } catch (_error_) {
                            _reject_(_error_);
                        }

                    });
                })
                _resolve_(true);
            });

        } catch (_error_) {
            console.log(_error_);
        }
    }

    __select_operator__ (_e_) {
        try {
            
            if (!this.__get_tables_config__()) {
                return false;
            }

           switch (_e_.target.getAttribute(`operator`)) {
               case `+`:
                    this.__generate_additions__();
                   break;
                case `-`:
                    this.__generate_substractions__();
                   break;
                case `*`:
                    this.__generate_multiplications__();
                   break;
                case `/`:
                    this.__generate_divisions__();
                   break;  
               default:
                   break;
           }

        } catch (_error_) {
            console.log(_error_);
        }
    }

    async __generate_additions__ () {
        try {

            await this.__generate_by_operator__(() => {
                let __terms = {
                    a: Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range),
                    b: Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range)
                }
                return {
                    basic: `${__terms.a} + ${__terms.b}`,
                    result: __terms.a + __terms.b
                }
            }, this.__get_tables__())
            .then(_built_ => {

            })
            .catch(_error_ => {
                console.log(_error_)
            })

        } catch (_error_) {
            console.log(_error_)
        }
    }

    async __generate_substractions__ () {
        try {

            this.__generate_by_operator__(() => {
                let __terms = {
                    a: Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range),
                    b: Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range)
                }
                return {
                    basic: `${__terms.a} - ${__terms.b}`,
                    result: __terms.a - __terms.b
                }
            }, this.__get_tables__());

        } catch (_error_) {
            console.log(_error_)
        }
    }

    async __generate_multiplications__ () {
        try {

            this.__generate_by_operator__(() => {
                let __terms = {
                    a: Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range),
                    b: Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range)
                }
                return {
                    basic: `${__terms.a} x ${__terms.b}`,
                    result: __terms.a * __terms.b
                }
            }, this.__get_tables__());

        } catch (_error_) {
            console.log(_error_)
        }
    }

    async __generate_divisions__ () {
        try {

            let __a, __b;
            
            const __terms__ = () => {
                try {

                    __a = Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range);
                    __b = Controllers.__min_max__(this.__tables_config.min_range, this.__tables_config.max_range);

                    return {
                        a: __a,
                        b: __b
                    };

                } catch (_error_) {
                    console.log(_error_);
                }
            }

            let  __terms = {}
            
            this.__generate_by_operator__(() => {
                __terms = {
                    a: 1,
                    b: 1
                };

                while((__terms.a / __terms.b) == 0 || (__terms.a / __terms.b) == 1) {
                    __terms = __terms__();
                }
                
                return {
                    basic: `${__terms.a} / ${__terms.b}`,
                    result: __terms.a /__terms.b
                }

            }, this.__get_tables__())
            .then(_built_ =>{
                __a = null;
                __b = null;
                __terms = null;
            })
            .catch(_error_ => {
                console.log(_error_)
            })

        } catch (_error_) {
            console.log(_error_)
        }
    }
}