(function() {
    tinymce.create('tinymce.plugins.Bull', {
        init : function(ed, url) {
            ed.addButton('dropcap', {
                icon: 'format-status',
                icon: 'bubble',
                //image: 'http://p.yusukekamiyamane.com/icons/search/fugue/icons/calendar-blue.png',
                tooltip: "Insert Tooltip",
                cmd : 'tooltip',
            });

          
            ed.addCommand('tooltip', function() {
               ed.windowManager.open({
                    title: 'Insert Tooltip',
                    body: [{
                        type: 'textbox',
                        name: 'textboxtooltipName',
                        label: 'Tooltip Text',
                        value: ''
                    }, {
                        type: 'listbox',
                        name: 'className',
                        label: 'Position',
                        values: [{
                            text: 'Top Tooltip',
                            value: 'top-tooltip'
                        }, {
                            text: 'Left Tooltip',
                            value: 'left-tooltip'
                        }, {
                            text: 'Right Tooltip',
                            value: 'right-tooltip'
                        }, {
                            text: 'Bottom Tooltip',
                            value: 'bottom-tooltip'
                        }]
                    }, ],
                    onsubmit: function(e) {
                        ed.insertContent(
                            '[tooltip position="' +
                            e.data.className +
                            '" title="' +
                            e.data.textboxtooltipName +
                            '"]' +
                            ed.selection
                            .getContent() +
                            '[/tooltip]'
                        );
                    }
                });
            });
 
        },
        // ... Hidden code
    });
    // Register plugin
    tinymce.PluginManager.add( 'bull', tinymce.plugins.Bull );


})();
