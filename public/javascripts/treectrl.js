function tree_add()
{
    var login = new Ext.FormPanel({
        labelWidth: 75,
        autoHeight: true,
        url: '/main/tree_add',
        frame: true,
        border: false,
        
        defaultType: 'textfield',
        items: [{
            name: 'path',
            value: treepath,
            hideMode: 'display',
            hidden: true,
            hideLabel: true
        },{
            fieldLabel: 'Text',
            width: 180,
            name: 'treetext',
            id: 'tree-new-text',
            allowBlank: false
        },{
            fieldLabel: 'Title',
            name: 'treetitle',
            width: 180,
            allowBlank: false
        }],
        
        buttons: [{
        text: 'Save',
            handler: function(){
                login.getForm().submit({
                    method: 'GET',
                    waitMsg:'Submitting...',
                    waitTitle: 'Iltimos kuting ...',
                    reset : false,
                    success : function(t1, t2){
                        tabpanel = Ext.getCmp('main-tab-panel');
                        tabpanel.remove (treepath.toString() + "-tab");
                        Ext.Msg.alert('Success', t2.result.text);
                        treetxt.root.reload();
                        newpath = Ext.getCmp('tree-new-text').getValue();
                        rp = /\./gi
                        selPath = treepath.replace(rp, "/") + "/"+newpath;
                        treepanel.selectPath('//'+selPath, 'text');
                        win.close();
                    },
                    failure: function(form,qaytdi){
                        Ext.Msg.alert('Error',qaytdi.result.text);
                    }
                });
            }
        },{
            text: 'Close',
            listeners:{
                'click': function (n){
                    win.close();
                }
            }
        }]
        });
    win = new Ext.Window({
        width: 305,
        height: 127,
        collapsible: true,
        draggable: true,
        modal: true,
        onEsc: function(){win.close()},
        resizable: false,
        shadow: true,
        shadowOffset: 7,
        title: 'Add child',
        items: [login]
     });
    win.show();
}

function del_func(bt)
{
    if (bt == "yes")
    {
        Ext.Ajax.request({
            url: '/main/tree_del',
            method: 'GET',
            params: {path: treepath},
            callback: function(t1,t2,t3){
                Ext.Msg.alert ("Message", t3.responseText);
                treetxt.root.reload();
                rp = /\//gi
                selPath = treepath.replace(rp, ".");
                tabpanel = Ext.getCmp('main-tab-panel');
                tmp = selPath;
                arrid = new Array();
                i = 0;
                tabpanel.findBy (function (art){
                    if (art.id.toString().indexOf (tmp.toString()) >= 0 && 
                        art.id.toString().indexOf ("-text") == -1)
                    {
                        arrid[i] = art.id;
                        i++;
                    }
                });
                for (j = 0; j < i; j++){
                    tabpanel.remove (arrid[j]);
                }
                treepanel.selectPath('//'+selPath, 'text');
            }
        });
        
    }
        
}
function tree_delete()
{
    Ext.MessageBox.confirm("Query", "Haqiqtdan o'chirishni hohlaysizmi", del_func);
}




function tree_edit(btn)
{
    var edit = new Ext.FormPanel({
		labelWidth: 75,
		autoHeight: true,
                url: '/main/edit_node',
		frame: true,
		border: false,
		defaultType: 'textfield',
		items: [{
			fieldLabel: 'Name',
                        value: btn.id,
			width: 180,
			name: 'child_value',
                        allowBlank: false
		}
              ],
              buttons: [{
                        text: 'Save',
                   
                        handler: function() {
                          edit.getForm().submit(
                          {
                            method: 'GET',
                            reset : false,
                            params: {'tree': treepath, 'olddata': btn.id},
                            success : function(t1, t2){
                                Ext.Msg.alert('Success',t2.result.text);
                                treepanel.root.reload();
                                rp = /\//gi
                              selPath = treepath.replace(rp, ".");
                              tabpanel = Ext.getCmp('main-tab-panel');
                              tmp = selPath;
                              arrid = new Array();
                              i = 0;
                              tabpanel.findBy (function (art){
                              if (art.id.toString().indexOf (tmp.toString()) >= 0 && 
                              art.id.toString().indexOf ("-text") == -1)
                              {
                                arrid[i] = art.id;
                                i++;
                              }
                            });
                            for (j = 0; j < i; j++){
                              tabpanel.remove (arrid[j]);
                            }
                                win.close();
                            },
                            failure: function(form,qaytdi){
                                Ext.Msg.alert('Error',qaytdi.result.text);
                                }
                          });
                        }
                    },

                  {
			text: 'Cancel',
			listeners:{
				'click': function (n){
					win.close();
				}
			}

		}]
	});
    win = new Ext.Window({
                xtype: 'Form',
                width: 305,
                height: 150,
                collapsible: true,
                draggable: true,
                modal: true,
                onEsc: function(){win.close()},
                resizable: false,
                shadow: true,
                shadowOffset: 7,
                title: 'Edit this node',
                items: [edit]
     });
    win.show();

}