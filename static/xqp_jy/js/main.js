/**
 * Crayola colors in JSON format
 * from: https://gist.github.com/jjdelc/1868136
 */
var colors =
[
    {
        "hex": "产权",
        "label": "产权",
        "rgb": "(239, 222, 205)"
    },
    {
        "hex": "产权交易",
        "label": "产权交易",
        "rgb": "(239, 222, 205)"
    },
    {
        "hex": "新车",
        "label": "新车",
        "rgb": "(239, 222, 205)"
    },
    {
        "hex": "二手车",
        "label": "二手车",
        "rgb": "(239, 222, 205)"
    }
    
];

$(function () {
	//if(!$.autocompleter) return;
  $('#nope').autocompleter({
        // marker for autocomplete matches
        highlightMatches: true,

        // object to local or url to remote search
        source: colors,

        // custom template
       // template: '{{ label }} <span>({{ hex }})</span>',
        template: '{{ label }} ',

        // show hint
        hint: true,

        // abort source if empty field
        empty: false,

        // max results
        limit: 5,

        callback: function (value, index, selected) {
            if (selected) {
                $('.icon').css('background-color', selected.hex);
            }
        }
    });
});
