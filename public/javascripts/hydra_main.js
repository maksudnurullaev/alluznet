function first_load()
{
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    new Ext.Viewport ({
        layout: 'border',
        id: 'main-window',
        items: [banner, tabpanel,treetxt]
    });
}
Ext.onReady(first_load);