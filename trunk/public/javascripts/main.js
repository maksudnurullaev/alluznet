var treeloader, treetxt,treepanel, treepath;
function refresh_tree()
{
    rp = /\./gi
    selPath = treepath.replace(rp, "/");
    tabs = selPath.split("/");
    alert (tabs.length);
}



function tree_click(tree)
{
    tabpanel = Ext.getCmp('main-tab-panel');
    //if (tree.leaf){
        tabid = Ext.getCmp(tree.id + '-tab');
        if (tabid)
        {
            tabpanel.setActiveTab(tabid);	
        }
    //}
}
var newtab1, textid, value;

function update_click()
{
    value = Ext.getCmp(textid).getValue();
    Ext.Ajax.request({
        url: '/main/update_title',
        method: 'GET',
        isLoading: true,
        params: {path: treepath, value: value},
        callback: function (t1, t2, t3){
            Ext.Msg.alert ("Message", t3.responseText);
        }
    });
}

function tab_activate(tab)
{
    textid = tab.id + '-text';
    treepath = Ext.getCmp(textid).fieldLabel;
    rp = /\./gi
    selPath = treepath.replace(rp, "/");
    treepanel.selectPath('//'+selPath, 'text');
}

function tree_dbclick(tree)
{
    treepath = tree.getPath('text');
    treepath = treepath.substr (2);
    re = /\//gi;
    treepath = treepath.replace (re, ".");
//    if (treepath != "HYDRA")
//    {
        tabpanel = Ext.getCmp('main-tab-panel');
        tabid = Ext.getCmp(tree.id + '-tab');
        textid = tree.id   + '-tab-text';
        if (!tabid)
        {
            tabpanel.add({
                border: false,
                title: tree.attributes.text,
                id: tree.attributes.id + '-tab',
                iconCls: tree.attributes.iconCls,
                closable: true,

                layout: 'border',
                items: [{
                    region: 'center',
                    border: true,
                    //title: 'url',
                    height: 100,
                    split: true,
                    minSize: 80,
                    maxSize: 150,
                    xtype: 'form',

                    labelSeparator: " = ",
                    labelWidth: 300,
                    bodyStyle: 'padding:15px',
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: treepath,
                        hideLabel: false,
                        id:  textid,
                        width: 150
                    }],

                    buttons: [{
                        text: 'Update title',
                        listeners:{
                            'click': update_click
                        }
                    },{
                        text: 'Add',
                        listeners: {
                            'click': tree_add
                        }
                    },{
                        text: 'Edit',
                        id: tree.attributes.text,
                        listeners: {
                            'click': tree_edit
                        }
                    },{
                        text: 'Delete',
                        listeners: {
                            'click': tree_delete
                        }
                    }]
                }],
                listeners:{
                    'activate': tab_activate
                }

            }).show();
            Ext.Ajax.request({
                url: '/main/tabdata',
                method: 'GET',
                loadingText: 'Searching...',
                params: {path: treepath},

                callback: function (t1, t2, t3){
                    Ext.getCmp(textid).setValue(t3.responseText);
                }
            });
        }
//    }
}

function first_load()
{
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    new Ext.Viewport ({
        layout: 'border',
        id: 'main-window',
        items: [banner, treetxt, tabpanel, footer]
    });
    create_tooltips();
    treepanel = Ext.getCmp('main-tree');
}

Ext.onReady(first_load);

