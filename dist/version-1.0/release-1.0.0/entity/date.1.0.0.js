APP.register(function DATE($this){
    var $self = this, $box = $this.toolbox, $date = new Date();
    $box.each($this, function () { $self[this.k] = this.v });

    var settings = {
        "lang" : $self.config.get("date.lang"),
    };
    function getSetDate(nb, what){
        if(nb === undefined){ return ($date['get'+what]()+((what==='Month')?1:0))+'' }
        if ($box.is(nb, 'number')) {
            nb = Math.abs(nb);
            if (nb > 0) {
                try {
                    $date['set' + what](nb-((what==='Month')?1:0))
                } catch (e) {
                    $date.setDate(nb)
                }
            }
            return $self
        }
        if(/[\+\-]\d+/.test(nb)){
            nb = (new Function("","return " + $date['get'+what]() + nb))() ;
            try { $date['set'+what](nb) } catch (e) { $date.setDate(nb) }
        }
        return $self
    }
    function daysInMonth(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() }

    /**
     * Permet d'obtenir une nouvelle date.
     *
     * @method set
     * @param {*} date Date à définir
     * @return {DATE}
     * @since 1.0
     */
    this.set = function (date) {
        if(date === undefined){ return $self }
        $date = new Date(date);
        return $self
    };

    /**
     * Permet d'obtenir la date JavaScript
     *
     * @method get
     * @return {Date}
     * @since 1.0
     */
    this.get = function () {
        return $date
    };

    /**
     * Permet d'obtenir ou de définir la langue de la date.
     *
     * @method lang
     * @param {String} [lang] La langue à définir.
     * @return {String|DATE}
     * @since 1.0
     */
    this.lang = function (lang) {
        if(lang === undefined){ return settings.lang }
        settings.lang = lang;
        return $self;
    };

    /**
     * Permet d'obtenir ou de définir l'année. L'obtention se fait sur les deux derniers chiffres.
     *
     * @method y
     * @param {*} [year] L'année à définir. Par exemple : 2015, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.y = function (year) {
        var res = getSetDate(year, 'FullYear') ;
        if(year === undefined){ res = res.slice(-2)}
        return res
    };

    /**
     * Permet d'obtenir ou de définir l'année.
     *
     * @method y
     * @param {*} [year] L'année à définir. Par exemple : 2015, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.yy = function (year) {
        return getSetDate(year, 'FullYear') ;
    };

    /**
     * Permet d'obtenir un chiffre correspondant un jour de la semaine. 0 pour Lundi, 1 pour Mardi, ...
     *
     * @method w
     * @return {Number}
     * @since 1.0
     */
    this.w = function () { return ($date.getDay()||7)-1 };

    /**
     * Permet d'obtenir le nom du mois.
     *
     * @method M
     * @param {int} [length] Longueur de la chaîne
     * @return {String}
     * @since 1.0
     */
    this.M = function (length) {
        var m = $self.config.get("date.months." + settings.lang)[$date.getMonth()];
        if(length === undefined){ length = 3 }
        return m.slice(0,Math.abs(length))
    };

    /**
     * Permet d'obtenir le nom complet du mois.
     *
     * @method MM
     * @return {String}
     * @since 1.0
     */
    this.MM = function () {
        return $self.config.get("date.months." + settings.lang)[$date.getMonth()];
    };

    /**
     * Permet d'obtenir le nom du jour.
     *
     * @method D
     * @param {int} [length] Longueur de la chaîne
     * @return {String}
     * @since 1.0
     */
    this.D = function (length) {
        var m = $self.config.get("date.days." + settings.lang)[$self.w()];
        if(length === undefined){ length = 3 }
        return m.slice(0,Math.abs(length))
    };

    /**
     * Permet d'obtenir le nom complet du jour.
     *
     * @method DD
     * @return {String}
     * @since 1.0
     */
    this.DD = function () {
        return $self.config.get("date.days." + settings.lang)[$self.w()];
    };

    var symbols = {
        "m": 'Month',
        "d": 'Date',
        "h": 'Hours',
        "i": 'Minutes',
        "s": 'Seconds',
        "l": 'Milliseconds'
    };
    $box.each(symbols, function(){
        var i = this.i, v = this.v ;
        $self[i] = function (nb) { return getSetDate(nb, v) };
        $self[i+i] = function (nb) {
            var res = getSetDate(nb, v) ;
            if (nb === undefined) {
                res = parseInt(res);
                if(res < 10){ res = "0" + res }
                res += "";
            }
            return res
        };
    });

    /**
     * Permet d'obtenir ou de définir le jour.
     *
     * @method day|d|dd
     * @param {*} [day] Le jour à définir. Par exemple : 25, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.day = function(day){ return $self.dd(day) };

    /**
     * Permet d'obtenir ou de définir le mois.
     *
     * @method month|m|mm
     * @param {*} [month] Le mois à définir. Par exemple : 6, "+2", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.month = function(month){ return $self.mm(month) };

    /**
     * Permet d'obtenir ou de définir l'année.
     *
     * @method year|y|yy
     * @param {*} [year] L'année à définir. Par exemple : 2015, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.year = function(year){ return $self.yy(year) };

    /**
     * Permet d'obtenir ou de définir l'heure.
     *
     * @method hour|h|hh
     * @param {*} [hour] L'heure à définir. Par exemple : 8, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.hour = function(hour){ return $self.hh(hour) };

    /**
     * Permet d'obtenir ou de définir les minutes.
     *
     * @method minute|i|ii
     * @param {*} [minute] La minute à définir. Par exemple : 30, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.minute = function(minute){ return $self.ii(minute) };

    /**
     * Permet d'obtenir ou de définir les secondes.
     *
     * @method second|s|ss
     * @param {*} [second] Les secondes à définir. Par exemple : 45, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.second = function(second){ return $self.ss(second) };

    /**
     * Permet d'obtenir ou de définir les millisecondes.
     *
     * @method millisecond|l|ll
     * @param {*} [millisecond] Les millisecondes à définir. Par exemple : 467, "+3", "-1"
     * @return {String|DATE}
     * @since 1.0
     */
    this.millisecond = function(millisecond){ return $self.ll(millisecond) };

    /**
     * Permet de formater une date
     *
     * @method format
     * @param {String} format Chaîne de formattage. Par exemple : "%DD %dd+1 %MM %yy"
     * @return {String}
     * @since 1.0
     */
    this.format = function(format){
        if(format === undefined){ return ''}
        format += '' ;
        format = format.replace(/(\%\w{1,2})([+-]\d+)?/g, function (format, s1, s2) {
            s1 = s1.slice(1);
            if ($self.hasOwnProperty(s1)) { $self[s1](s2); return '%' + s1 }
            return format;
        });
        format = format.replace(/\%\w{1,2}/g, function (format) {
            format = format.slice(1);
            if ($self.hasOwnProperty(format)) { return $self[format]() }
            return format;
        });
        return format
    } ;

    /**
     * Permet de compter le nombre de jours dans un mois ou le nombre de lundi par exemple
     *
     * @method count
     * @param {String} [day] Chaîne de formattage. Par exemple : "%DD %dd+1 %MM %yy"
     * @return {int}
     * @since 1.0
     */
    this.count = function(day){
        var totalDays = daysInMonth($date);
        if(day === undefined){ return totalDays }
        var total = 0, reg = new RegExp('^'+day+'$','i');
        var copyDate = $box.clone($date);
        $box.each(totalDays, function(){
            $date.setDate(this.i+1);
            if(reg.test($self.DD())){ total++ }
        }) ;
        $date = copyDate;
        return total
    };

    /**
     * Permet d'obtenir des dates à avenir
     *
     * @method next
     * @param {String} [next] Par exemple : "Lundi" pour la date correspondant au Lundi suivant, "Janvier" pour la date correspondant au Janvier suivant
     * @return {DATE}
     * @since 1.0
     */
    this.next = function(next){
        if(next===undefined){ return $self.d('+1') }
        var reg = new RegExp('^'+next+'$','i');

        // @TODO :  Faire la recherche pour les nombres (vérifier si 0<next<32)

        // Recherche pour les jours
        var days = $self.config.get("date.days." + settings.lang);
        days = days.concat(days).slice($self.w()+1);
        var i, k = days.length ;
        for(i=0 ; i<k ; i++){
            //var v = i+1+parseInt($self.d(),10);
            if(reg.test(days[i])){ $self.d(i+1+parseInt($self.d(),10)); return $self }
        }
        // Recherche pour les mois
        var months = $self.config.get("date.months." + settings.lang);
        months = months.concat(months).slice($date.getMonth()+1) ;
        var i, k = months.length ;
        for(i=0 ; i<k ; i++){
            if(reg.test(months[i])){ $date.setMonth($date.getMonth()+i+1); return $self }
        }
        return $self
    };

    /**
     * Permet d'obtenir des dates précédentes
     *
     * @method previous
     * @param {String} [previous] Par exemple : "Lundi" pour la date correspondant au Lundi précédent, "Janvier" pour la date correspondant au mois de Janvier précédent
     * @return {DATE}
     * @since 1.0
     */
    this.previous = function(previous){
        if(previous===undefined){ return $self.d('-1') }
        var reg = new RegExp('^'+previous+'$','i');

        // @TODO :  Faire la recherche pour les nombres (vérifier si 0<next<32)

        // Recherche pour les jours
        var days = $self.config.get("date.days." + settings.lang);
        days = days.concat(days.slice(0,$self.w())) ;
        var i, k = days.length-1 ;
        for(i=k ; i>-1 ; i--){
            if(reg.test(days[i])){ $date.setDate($date.getDate()-k+i-1); return $self }
        }
        // Recherche pour les mois
        var months = $self.config.get("date.months." + settings.lang);
        months = months.concat(months.slice(0,$date.getMonth())) ;
        var i, k = months.length-1 ;
        for(i=k ; i>-1 ; i--){
            if(reg.test(months[i])){ $date.setMonth($date.getMonth()-k+i-1); return $self }
        }

        return $self
    };

    /**
     * Permet d'obtenir la date courante
     *
     * @method now
     * @return {DATE}
     * @since 1.0
     */
    this.now = function(){ $date = new Date(); return $self };

}, {}, {});