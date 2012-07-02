(function(win, doc){
    var scriptHtml;
    if (win.LOAD_GXM && Ext.isArray(win.LOAD_GXM)) {
        Ext.each(win.LOAD_GXM, function(resource){
            scriptHtml = [
                "<script type='text/javascript'",
                " src='" + resource + "'",
                "></script>"
            ];
            doc.write(scriptHtml.join(""));
        });
    }
})(window, document);