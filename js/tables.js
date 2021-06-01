class Tables extends HTMLElement {
    constructor (_controllers_) {

        super();

        this.__controllers = _controllers_;
        this.__is_selecting_cells = false;
    
        this.__init__ = this.__init__.bind(this);

        this.addEventListener(`mouseup`, () => {
            this.__is_selecting_cells = false;
        })

        this.addEventListener(`mousemove`, (_e_) => {
            
            if (_e_.target.classList.contains(`row`)) {

                if (this.__is_selecting_cells && !_e_.target.hasAttribute(`selected`)) {
                    _e_.target.setAttribute(`selected`, true);
                }
            }
        })

        this.addEventListener(`mousedown`, (_e_) => {
            this.__is_selecting_cells = true;
            
            if (_e_.target.classList.contains(`row`)) {

                if (this.__is_selecting_cells && !_e_.target.hasAttribute(`selected`)) {
                    _e_.target.setAttribute(`selected`, true);
                }
                
                if (_e_.target.hasAttribute(`selected`)) {
                    _e_.target.removeAttribute(`selected`);
                }
            }
        })

    }

    __init__ () {
        try {

            let bin = document.createElement(`div`);
            bin.classList.add(`remove_table`);
            bin.addEventListener(`click`, (_e_) => {
                this.__controllers.__total_tables--;
                _e_.target.remove();
                this.remove();
                if (!this.__controllers.__total_tables) {
                    document.querySelector(`.table_builder`).setAttribute(`render`, true);
                    document.querySelector(`.tables`).setAttribute(`render`, false);
                }
            })
    
            return bin;

        } catch (_error_) {
            console.log(_error_);
        }
    }

}

customElements.define(`mathy-table`, Tables);