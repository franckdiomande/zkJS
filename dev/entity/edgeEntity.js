zk().register(function EDGE($this) {
    var $self = this,
        $box = $this.toolbox,
        $edges = ["top", "right", "bottom", "left"],
        $edgesValues = [null, null, null, null];
    $box.each($this, function () { $self[this.k] = this.v });
    this.get = function () {
        return $edgesValues
    };
    this.set = function (value) {
        if(!$box.is(value, "array")){ value = [value] }
        value = value.slice(0, 4);
        value = value.concat($edgesValues.slice(value.length));
        $box.each(value, function () {
            $self[$edges[this.i]](this.v)
        });
        return $self
    };
    this.top = function (value) {
        if(value === undefined){ return $edgesValues[0] }
        $edgesValues[0] = value;
        return $self
    };
    this.right = function (value) {
        if(value === undefined){ return $edgesValues[1] }
        $edgesValues[1] = value;
        return $self
    };
    this.bottom = function (value) {
        if(value === undefined){ return $edgesValues[2] }
        $edgesValues[2] = value;
        return $self
    };
    this.left = function (value) {
        if(value === undefined){ return $edgesValues[3] }
        $edgesValues[3] = value;
        return $self
    };
}, {}, {});