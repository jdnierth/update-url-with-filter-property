$(document).ready(function () {

    var filter = {};

    /**
     * Removes clicked group and value from the filter object
     * @param {string} the name of the group, the filter property that needs to be removed.
     * @param {string} the name of the value, the filter value that needs to be removed.
     */
    function _removeFromFilter(group, value) {

        var valueArr = filter[group];

        if (valueArr) {
            var indexOfVal = valueArr.indexOf(value);

            filter[group].splice(indexOfVal, 1);

            if (valueArr.length === 0) {
                delete filter[group];
            }
        }
    }

    /**
     * Adds filter properties to a filter object.
     * The resulting object will have a list of properties which represent the filter category
     * and each filter category can have a comma separated list of filter properties.
     * 
     * @param {string} group filter category (e.g. color-type)
     * @param {string} value filter value (e.g. permanent-color)
     * @private
     */
    function _addToFilter(group, value) {
        if (filter.hasOwnProperty(group)) {
            var currGroupFilter = filter[group];
            currGroupFilter.push(value);
            filter[group] = currGroupFilter;

        } else {
            var valueArr = [];
            valueArr.push(value);
            filter[group] = valueArr;
        }
    }

    /**
     * Converts the filter object into a string that can be used
     * as a query string to update the url on ajax calls.
     * 
     * @returns {string} the selected filters as a query stringn.
     * @private
     */
    function _convertFilterToUrl() {
        var params = "?";

        Object.keys(filter).forEach(function (key, index) {
     
            var properties = filter[key].join(',');

            if (index != 0) {
                params += '&' + key + '=' + properties;
            } else {
                params += key + '=' + properties;
            }
        });

        return params;
    }

    /**
     * Any time a checkbox is being clicked it'll update the filter object by either
     * adding or removing filter properties.
     * 
     * @param {Event} e change event.
     * @private
     */
    function _changedFilter(e) {

        var $chk = $(e.currentTarget),
            chkVal = $chk.val(),
            group = $chk.parents('fieldset').find('legend').text();

        var isChecked = $chk.is(':checked');

        if (isChecked) {
            _addToFilter(group, chkVal);
        } else {
            _removeFromFilter(group, chkVal);
        }

        console.log(filter);

        var params = _convertFilterToUrl();

        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + params;
            window.history.pushState({path: newurl}, '', newurl);

        }
    }

    $('input[type="checkbox"]').on("change", _changedFilter);

});