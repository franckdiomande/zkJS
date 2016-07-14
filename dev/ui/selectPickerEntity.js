zk().register(function SELECTPICKER($this){
    var $self = this, $box = $this.toolbox, $entity = $this.entity.get, $hasSelect = false,
        $select = null, $options = null;
    $box.each($this, function () { $self[this.k] = this.v });

    function insertNodeBefore(nouvEl, beforeEl) {
        var parent = beforeEl.parentNode;
        parent.insertBefore(nouvEl, beforeEl);
        return parent
    }

    var $container = $entity("Node").create({
        "name": "div",
        "class": "zk-selectpicker-container",
        "html": "<ul></ul>",
    });
    $container.display("none").absolute();
    var $items = $entity("Node").set($container.get()[0].querySelector("ul"));

    /**
     * Permet de définir l'élément select à utiliser. Fonctionne que si un élément select est défini.
     *
     * @method set
     * @param {object} selector Sélecteur pour un élément select.
     * @return {SELECTPICKER}
     * @since 1.0
     */
    this.set = function (selector) {
        if(!$hasSelect){
            var nodes = $entity("Node").set(selector);
            nodes.each(function () {
                if((this.v.nodeName).toLowerCase() === "select"){
                    $select = $entity("Node").set(this.v); $hasSelect = true;
                    return $entity("Error");
                }
            });
            if($hasSelect){
                $select.hide();
                var select = $select.get()[0];
                insertNodeBefore($container.get()[0], select);
                $options = $entity("Node").set(select.options);
                $options.each(function () {
                    $items.add({
                        "name": "li",
                        "class": "zk-selectpicker-items",
                        "html": this.v.innerHTML,
                        "data-zk-index": this.i,
                        "data-zk-value": this.v.value || this.v.innerHTML
                    });
                });
                $items.children().on("click.zkSelectPickerItemsClickEvent", function () {
                    $entity("Node").set(this.source).toggleClass("zk-selectpicker-item-selected");
                });
                $container.on("clickout.zkSelectPickerClickoutEvent", function () {
                    $entity("Node").set(this.source).hide();
                });
            }
        }
        return $self;
    };

    /**
     * Permet d'obtenir les valeurs sélectionnées ou de définir des valeurs à sélectionner.
     *
     * @method val
     * @param {*} [values] Valeurs à sélectionner.
     * @return {array|SELECTPICKER}
     * @since 1.0
     */
    this.val = function (values) {
        if(values === undefined){
            var res = [];
            if($hasSelect){
                $items.each(function () {
                    if($entity("Node").set(this.v).hasClass("zk-selectpicker-item-selected")){
                        res.push(this.v.getAttribute("data-zk-value"))
                    }
                });
            }
            return res;
        }
        if($hasSelect){
            if(!$box.is(values, "array")){ values = [values]; }
            $items.each(function () {
                if($box.has(values, this.v.getAttribute("data-zk-value"))){
                    $entity("Node").set(this.v).addClass("zk-selectpicker-item-selected")
                }
            });
        }
        return $self;
    };

    /**
     * Permet d'afficher le selectPicker.
     *
     * @method show
     * @param {string} [x] Position d'un élément par rapport au bord gauche du document.
     * @param {string} [y] Position d'un élément par rapport au bord supérieur du document.
     * @return {SELECTPICKER}
     * @since 1.0
     */
    this.show = function (x, y) {
        if($hasSelect){
            $container.show(x, y);
        }
        return $self;
    };

    /**
     * Permet de cacher le selectPicker.
     *
     * @method hide
     * @return {SELECTPICKER}
     * @since 1.0
     */
    this.hide = function () {
        if($hasSelect){ $container.hide(); }
        return $self;
    };


}, {}, {});